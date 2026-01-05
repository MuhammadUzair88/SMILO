"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "../dbConnect";
import User from "@/models/User";

export async function syncUser(): Promise<void> {
  try {
    const user = await currentUser();
    if (!user) return;

    await connectToDB();

    const exists = await User.exists({ clerkId: user.id });
    if (exists) return;

    await User.create({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phoneNumbers[0]?.phoneNumber,
    });

    console.log("✅ User synced");
  } catch (err) {
    console.error("❌ syncUser error:", err);
  }
}
