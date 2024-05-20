"use server";

import { z } from "zod";
import { PostSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const createPost = async (
    values: z.infer<typeof PostSchema>,
    email: string,
) => {
  // Validate the input values against the Post schema
  const validateFields = PostSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields provided! Please check the data format." };
  }

  const { content, tags, location, imageUrl } = validateFields.data;

  // Process tags, ensuring no spaces and splitting by commas
  const tagsArr = tags?.replace(/ /g, "").split(",") || [];

  // Fetch the user by email
  const currentUser = await getUserByEmail(email);
  if (!currentUser) {
    return { error: "User not found. Please ensure the user exists and is logged in." };
  }

  // Create a new post in the database
  try {
    await db.posts.create({
      data: {
        content,
        imageUrl,
        tags: tagsArr,
        location,
        authorId: currentUser.id, // No need for optional chaining as user existence is confirmed
      },
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    // Handle specific or general errors more gracefully
    return { error: "Failed to create post. Please try again later." };
  }

  return { success: "Post created successfully!" };
};