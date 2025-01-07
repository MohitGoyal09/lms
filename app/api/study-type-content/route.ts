import { db } from "@/config/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

interface Chapter {
  title: string;
  content: string;
}

export async function POST(req: Request) {
    try {
      const { chapters, courseId, type } = await req.json();

      if (!chapters || !courseId || !type) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      if (!Array.isArray(chapters)) {
        return NextResponse.json(
          { error: "Chapters must be an array" },
          { status: 400 }
        );
      }

      const chapterContent = chapters
        .map((chapter: Chapter) => `${chapter.title}: ${chapter.content}`)
        .join("\n");

      const PROMPT =
        type == "flashcards"
          ? `Generate a JSON-formatted response on the topic: ${chapterContent}. 
            The content should include front and back pairs, similar to flashcards, 
            with a maximum of 15 items. Ensure the response is structured as a JSON object 
            with 'front' and 'back' keys for each item.`
          : `Generate Quiz on topic : ${chapterContent} with Question and Options along with correct answer in JSON format , (Max 10)`;

      console.log('AI Prompt:', PROMPT);
      //Generate Quiz on topic : <Chapters> with Question and Options along with correct answer in JSON format , (Max 10)

      const result = await db
        .insert(STUDY_TYPE_CONTENT_TABLE)
        .values({
          courseId: courseId,
          type: type,
        })
        .returning({
          id: STUDY_TYPE_CONTENT_TABLE.id,
        });

      await inngest.send({
        name: "studyType.content",
        data: {
          studyType: type,
          prompt: PROMPT,
          courseId: courseId,
          recordId: result[0].id,
        },
      });

      return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/study-type-content:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
