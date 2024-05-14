"use server";

import { z } from "zod";
import { PostSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const createPost = async (
  values: z.infer<typeof PostSchema>,
  email: string,
) => {
  const validateFields = PostSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { content, tags, location, imageUrl } = validateFields.data;

  const tagsArr = tags?.replace(/ /g, "").split(",") || [];

  const currentUser = await getUserByEmail(email);

  if(!currentUser) {
    return {error: "Went wrong"}
  }

  await db.posts.create({
    data: {
      content,
      imageUrl,
      tags: tagsArr,
      location,
      authorId: currentUser?.id,
    },
  });

  return { success: "Post created!" };
};
