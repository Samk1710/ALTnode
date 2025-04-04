"use server";

import { getInhouseScript } from "@/functions/keyCrypt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs/promises";
import { executeContextScript, executePythonScript } from "@/app/lib/utils";


export async function POST(request: NextRequest) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ error: `Invalid JSON: ${e}` }, { status: 400 });
    }

    const { ipfsUrl, prompt, query } = body;

    const data = await fetch(ipfsUrl);
    const dataText = await data.text();

    let script = await getInhouseScript();

    const publicPath = path.join(process.cwd(), 'public', 'temp', 'temp.txt');
    await fs.writeFile(publicPath, dataText);

    const contextScriptPath = path.join(process.cwd(), 'scripts', 'context_processor', 'main.py');

    const searchResults = JSON.parse(await executeContextScript(contextScriptPath, query));

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

    const inputJson = {
        "question": prompt
    }

    const runScript = `print(json.dumps(run(${JSON.stringify(inputJson)}, ${JSON.stringify(context)})))`;

    script = script + "\n\n" + runScript;

    const scriptPath = "./temp_script.py";
    await fs.writeFile(scriptPath, script);

    const result = await executePythonScript(scriptPath);

    return NextResponse.json({ 
        response: JSON.parse(result).response
    });
}