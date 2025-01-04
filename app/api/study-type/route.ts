import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

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

            const result = {
                notes: notes,
                flashcard: null,
                quiz: null,
                qa : null
            };

            return NextResponse.json(result);
        }
        else if (studyType == 'notes') {
            const notes = await db
                .select()
                .from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

            return NextResponse.json(notes);
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
 
}