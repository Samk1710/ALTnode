"use server";

import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import { NextResponse, NextRequest } from "next/server";

async function runTest1(script: string): Promise<boolean> {
    const functionPattern = /^def\s+run\s*\(\s*input_json\s*(,\s*context\s*=\s*None\s*)?\s*\):/m;
    const lines = script.split('\n');
    for (const line of lines) {
        if (functionPattern.test(line.trim())) {
            return true;
        }
    }
    return false;
}

async function runTest2(model: string, inputJson: string, script: string): Promise<boolean> {
    const LLM = `LLM = "${model}"`;
    const input = `input_json = ${inputJson}`;
    const runline = `print(json.dumps(run(input_json)))`;
    const pythonScript = `${LLM}\n\n${input}\n\n${script}\n\n${runline}`;
    await fs.writeFile(path.join(process.cwd(), 'public', 'temp', 'temp.py'), pythonScript);
    try {
        await executePythonScript(path.join(process.cwd(), 'public', 'temp', 'temp.py'));
        return true;
    }
    catch (e) {
        return false;
    }
}

async function runTest3(model: string, inputJson: string, script: string): Promise<boolean> {
    const LLM = `LLM = "${model}"`;
    const input = `input_json = ${inputJson}`;
    const context = `context = "Random Context String"`;
    const runline = `print(json.dumps(run(input_json, context)))`;
    const pythonScript = `${LLM}\n\n${input}\n\n${context}\n\n${script}\n\n${runline}`;
    await fs.writeFile(path.join(process.cwd(), 'public', 'temp', 'temp.py'), pythonScript);
    try {
        await executePythonScript(path.join(process.cwd(), 'public', 'temp', 'temp.py'));
        return true;
    }
    catch (e) {
        return false;
    }
}


function executePythonScript(scriptPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python3", [scriptPath]);

        let output = "";
        let errorOutput = "";

        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                resolve(output.trim());
            } else {
                reject(new Error(`Python script error: ${errorOutput.trim()}`));
            }
        });
    });
}

async function posthandler(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: `Invalid JSON: ${e}` }, { status: 400 });
    }

    if (!body.script) {
        return NextResponse.json({ error: "Missing script" }, { status: 400 });
    }

    if (!body.testNum) {
        return NextResponse.json({ error: "Missing testNum" }, { status: 400 });
    }
    let res;
    switch (body.testNum) {
        case 1:
            const { script } = body;
            res = await runTest1(script);
            break;
        case 2:
            if (!body.model) {
                return NextResponse.json({ error: "Missing model" }, { status: 400 });
            }
        
            if (!body.inputJson) {
                return NextResponse.json({ error: "Missing inputJson" }, { status: 400 });
            }
            const { model, inputJson, script: script2 } = body;
            res = await runTest2(model, inputJson, script2);
            break;
        case 3:
            if (!body.model) {
                return NextResponse.json({ error: "Missing model" }, { status: 400 });
            }

            if (!body.inputJson) {
                return NextResponse.json({ error: "Missing inputJson" }, { status: 400 });
            }
            const { model: model3, inputJson: inputJson3, script: script3 } = body;
            res = await runTest3(model3, inputJson3, script3);
            break;
        default:
            return NextResponse.json({ error: "Invalid testNum" }, { status: 400 });
    }
    return NextResponse.json({ success: res });
}

export {
    posthandler as POST
}
