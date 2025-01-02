import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user } = await req.json();
    const result = await inngest.send({
      name: "create-new-user",
      data: { user },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Inngest Error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
