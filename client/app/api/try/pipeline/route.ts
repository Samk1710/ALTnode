"use server";

import { getInhouseScript } from "@/functions/keyCrypt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs/promises";
import { executeContextScript, executePythonScript } from "@/app/lib/utils";
import { decrypt } from "@/functions/decrypt";


async function posthandler(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: `Invalid JSON: ${e}` }, { status: 400 });
    }

    const { encryptedAssetUrl, encryptedKey, inputJson } = body;
    const pipeline = await fetch((await decrypt(encryptedAssetUrl, encryptedKey)).decryptedString);

    // const pipeline = await fetch(pipelineIPFS);
    let script = `LLM = "llama-3-1-70b"\n` + await pipeline.text();

    const data = null;
    const runScript = `print(json.dumps(run(${JSON.stringify(inputJson)})))`;
    
    script = script + "\n\n" + runScript;

    const scriptPath = "./temp_script.py";
    try {
        await fs.writeFile(scriptPath, script);

        const result = await executePythonScript(scriptPath);

        return NextResponse.json({ result: JSON.parse(result) }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    } finally {
        await fs.unlink(scriptPath);
    }
}

export { posthandler as POST };