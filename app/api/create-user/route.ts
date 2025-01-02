import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req : Request){
    const {user} = await req.json();
    const result = await inngest.send({
        name : "create-new-user",
        data : {user}
    })
    return NextResponse.json(result);
}