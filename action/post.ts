"use server";

import { z } from "zod";
import { PostSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const createPost = async (
    values: z.infer<typeof PostSchema>,
    email: string,
    imageUrl: string
) => {
  const validateFields = PostSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields provided! Please check the data format." };
  }

  const { content, tags, location} = validateFields.data;

  const tagsArr = tags?.replace(/ /g, "").split(",") || [];

  const currentUser = await getUserByEmail(email);
  if (!currentUser) {
    return { error: "User not found. Please ensure the user exists and is logged in." };
  }

  try {
    await db.post.create({
      data: {
        content,
        imageUrl,
        tags: tagsArr,
        location,
        authorId: currentUser.id,
      },
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    return { error: "Failed to create post. Please try again later." };
  }

  return { success: "Post created successfully!" };
};