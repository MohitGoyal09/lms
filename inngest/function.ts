import {
  generateNotes,
  GenerateStudyTypeContent as GenerateStudyTypeAI,
  GenerateQuizAiModel
} from "@/config/AiModel";
import { inngest } from "./client";
import { db } from "@/config/db";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  USER_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from "@/config/schema";

import { and, eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  {
    id: "create-new-user",
  },
  {
    event: "create-new-user",
  },
  async ({ event, step }) => {
    // Extract user data from event payload
    const { user } = event.data;
    const result = await step.run("Check User and create New", async () => {
      // Check if User Already Exists
      const existingUser = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      if (existingUser.length === 0) {
        // Insert new user into the database
        const newUser = await db
          .insert(USER_TABLE)
          .values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          })
          .returning();

        return `User ${newUser[0].email} created successfully.`;
      } else {
        return `User with email ${user?.primaryEmailAddress?.emailAddress} already exists.`;
      }
    });
  }
);

export const GenerateNotes = inngest.createFunction(
  {
    id: "generate-course",
  },
  {
    event: "notes.generate",
  },
  async ({ event, step }) => {
    const { course } = event.data;
    const notesResult = await step.run("Generate Notes", async () => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;
      Chapters.forEach(async (chapter: any) => {
        const PROMPT =
          "Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag), The chapters :" +
          JSON.stringify(chapter);
        const result = await generateNotes.sendMessage(PROMPT);
        const aiResp = await result.response.text();
        await db
          .insert(CHAPTER_NOTES_TABLE)
          .values({
            courseId: course.courseId,
            chapterId: index,
            notes: aiResp,
          })
          .returning();
        index++;
      });

      return "Notes Generated Successfully";
    });
    const UpdateCourseStatus = await step.run(
      "Update Course Status",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "notes_generated",
          })
          .where(eq(STUDY_MATERIAL_TABLE.id, course.id))
          .returning();
        return "Course Updated Successfully";
      }
    );
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  {
    id: "generate-study-type-content",
  },
  {
    event: "studyType.content",
  },
  async ({ event, step }) => {
    const { studyType, prompt, courseId , recordId} = event.data;
    
    const AiResult = await step.run(
      "Generating FlashCard using AI",
      async () => {
        const result =
          studyType === "flashcards"
            ? await GenerateStudyTypeAI.sendMessage(prompt)
            : await GenerateQuizAiModel.sendMessage(prompt);
        const AIResult = JSON.parse(result.response.text());
        return AIResult;
      }
    );
  
    const DbResult = await step.run("Save result to DB", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AiResult,
          status : 'Ready'
        })
        .where(
          and(
            eq(STUDY_TYPE_CONTENT_TABLE.id, recordId),
        
          )
        );
      return "Data Saved Successfully";
    });
  }
);
