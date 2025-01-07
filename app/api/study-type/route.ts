import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq , and} from "drizzle-orm";

export async function POST(req : Request) {
    try {
        const { courseId, studyType } = await req.json();
        
        if (!courseId || !studyType) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (studyType == "ALL") {
            const notes = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
            
            const getContent = await db
                .select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

            const result = {
                notes: notes,
                flashcard: getContent.find((content) => content.type === 'flashcards') || null,
                quiz: getContent.find((content) => content.type === 'quiz') || null,
                qa: getContent.find((content) => content.type === 'qa') || null
            };
            console.log('Result:', result);
            return NextResponse.json(result);
        }
        else if (studyType == 'notes') {
            const notes = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
            // console.log('Notes:', notes);
            return NextResponse.json(notes);
        }
        else  {
            const content = await db
            .select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(and(
                eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
            ));
            console.log('Content:', content);
            return NextResponse.json(content[0]);
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
 
}