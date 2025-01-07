import { db } from "@/config/db";
import { USER_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("Checking user status for email:", email);

    const users = await db
      .select({
        id: USER_TABLE.id,
        email: USER_TABLE.email,
        isMember: USER_TABLE.isMember,
        customerId: USER_TABLE.customerId,
      })
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email));

    console.log("Found users:", users);

    if (users.length === 0) {
      // If user doesn't exist, create a new one with default values
      const newUser = await db
        .insert(USER_TABLE)
        .values({
          email: email,
          name: email.split("@")[0], // Use email prefix as name
          isMember: false,
          createdAt: new Date(),
        })
        .returning();

      console.log("Created new user:", newUser[0]);
      return NextResponse.json(newUser[0], { status: 201 });
    }

    const user = users[0];
    console.log("Returning user data:", user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in user API:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
