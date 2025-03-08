"use server";

import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import { NextResponse, NextRequest } from "next/server";

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
    const { model, inputJson, script } = await req.json();
    const LLM = `LLM = "${model}"`;
    const input = `input_json = ${inputJson}`;
    const runline = `print(json.dumps(run(input_json)))`;
    const pythonScript = `${LLM}\n\n${input}\n\n${script}\n\n${runline}`;
    await fs.writeFile(path.join(process.cwd(), 'public', 'temp', 'temp.py'), pythonScript);
    try {
        const output = await executePythonScript(path.join(process.cwd(), 'public', 'temp', 'temp.py'));
        console.log("Here")
        console.log(output);
        return NextResponse.json({ output: output });
    } catch (e) {
        return NextResponse.json({ output: "Error running script" }, { status: 500 });
    }

}

export {
    posthandler as POST
}