"use server";

import { getData, getInhouseScript, getScript } from "@/functions/keyCrypt";
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

async function posthandler(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: `Invalid JSON: ${e}` }, { status: 400 });
    }

    if (!body.model) {
        return NextResponse.json({ error: "Missing model" }, { status: 400 });
    }

    if (!body.inputJson) {
        return NextResponse.json({ error: "Missing inputJson" }, { status: 400 });
    }

    const LLM = body.model;

    let data, script, runScript;

    if (!body.pipeKey) {
        script = await getInhouseScript(LLM);
    } else {
        script = await getScript(LLM, body.pipeKey, body.address);
    }

    if (!body.dataKey) {
        data = null;
        runScript = `print(json.dumps(run(${JSON.stringify(body.inputJson)})))`;
    } else {
        if (!body.query) {
            return NextResponse.json({ error: "Missing query. Query must be provided when dataKey is provided" }, { status: 400 });
        }
        data = await getData(body.dataKey, body.address);

        const publicPath = path.join(process.cwd(), 'public', 'temp', 'temp.txt');
        await fs.writeFile(publicPath, data);

        const contextScriptPath = path.join(process.cwd(), 'scripts', 'context_processor', 'main.py');

        const searchResults = JSON.parse(await executeContextScript(contextScriptPath, body.query));

        // const context = searchResults.length > 0 ? searchResults[0].text : "";
        let context;
        if (searchResults.length > 0) {
            for (const result of searchResults) {
                context = context ? context + "\n" + result : result;
            }
        }

        if (!context) {
            context = "No relevant context found";
        }

        runScript = `print(json.dumps(run(${JSON.stringify(body.inputJson)}, ${JSON.stringify(context)})))`;
        console.log(context);
    }

    script = script + "\n\n" + runScript;

    const scriptPath = "./temp_script.py";
    await fs.writeFile(scriptPath, script);
    console.log(script);
    console.log("Here")
    try {
        console.log("Here")
        console.log(scriptPath)
        const result = await executePythonScript(scriptPath);
        console.log("Here")
        console.log(result);
        return NextResponse.json({
            result: {
                query: body.dataKey ? body.query : null,
                input: JSON.parse(result).input,
                output: JSON.parse(result).response
            }
        }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    } finally {
        await fs.unlink(scriptPath);
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
                reject(new Error(errorOutput.trim()));
            }
        });
    });
}


function executeContextScript(scriptPath: string, query: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python3", [scriptPath, query]);

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
                output = output.substring(output.indexOf("["), output.lastIndexOf("]") + 1);
                console.log('Output:', output);
                resolve(output.trim());
            } else {
                reject(new Error(errorOutput.trim()));
            }
        });
    });
}

async function exists(path: string): Promise<boolean> {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export {
    posthandler as POST
};
