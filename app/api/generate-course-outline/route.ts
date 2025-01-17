import { courseOutline } from "@/config/AiModel";
import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { Inngest } from "inngest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { courseId, topic, studyType, difficulty, createdBy } = data;

    if (!courseId || !topic || !studyType || !difficulty || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const PROMPT = `Generate a study material for ${topic} for ${studyType} and level of difficulty will be ${difficulty} with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter. All result in JSON format`;
    console.log("AI Prompt:", PROMPT); 

    let aiResp;
    try {
      aiResp = await courseOutline.sendMessage(PROMPT);
      console.log("AI Response:", JSON.stringify(aiResp, null, 2));
    } catch (error) {
      console.error("Error generating AI response:", error);
      return NextResponse.json(
        { error: "Failed to generate study material" },
        { status: 500 }
      );
    }

    let aiResult;
    try {
      if (!aiResp || !aiResp.response) {
        throw new Error("AI response is missing expected fields");
      }

      const text = await aiResp.response.text();
      console.log("Extracted Text:", text);

      if (typeof text !== "string") {
        throw new Error("AI response text is not a string");
      }

      aiResult = JSON.parse(text);

      if (!aiResult || typeof aiResult !== "object") {
        throw new Error("AI response is not a valid JSON object");
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    try {
      const dbResult = await db
        .insert(STUDY_MATERIAL_TABLE)
        .values({
          courseId: courseId,
          topic: topic,
          courseType: studyType,
          difficultyLevel: difficulty,
          createdBy: createdBy,
          courseLayout: aiResult,
        })
        .returning();

      try {
        const result = await inngest.send({
          name: "notes.generate",
          data: {
            course: dbResult[0],
          },
        });
        if (!result) {
          throw new Error("Failed to queue notes generation");
        }
      } catch (error) {
        console.error("Error queuing notes generation:", error);
      }
      return NextResponse.json(dbResult[0], { status: 201 });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save study material" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request parsing error:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
