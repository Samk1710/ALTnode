"use server";

import { NextResponse, NextRequest } from "next/server";
import { getData, getInhouseScript, getScript } from "@/functions/keyCrypt";

async function postHandler (req: NextRequest) {
    const body = await req.json();
    const { dataKey, address } = body;

    const res = await getData(dataKey, address);

    return NextResponse.json(res);
}

export {
    postHandler as POST
}