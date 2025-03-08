"use server";

import fs from "fs/promises";
import path from "path";
import { NextResponse, NextRequest } from "next/server";

async function gethandler(req: NextRequest) {
    try {
        await fs.unlink(path.join(process.cwd(), 'public', 'temp', 'temp.py'));
        return NextResponse.json({ success: true });
    }
    catch (e) {
        return NextResponse.json({ success: false });
    }
}


export {
    gethandler as GET
}