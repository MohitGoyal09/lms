import { inngest } from "./client";
import { db } from "@/config/db";
import { USER_TABLE } from "@/config/schema";

import { eq } from "drizzle-orm";


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
