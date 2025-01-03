import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
  try {
    const { createdBy } = await req.json();

    if (!createdBy) {
      return NextResponse.json(
        { error: "createdBy is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy));

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching study materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch study materials" },
      { status: 500 }
    );
  }
}
