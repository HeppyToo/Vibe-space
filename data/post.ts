
export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true, // Include author data
      },
    });

    if (!posts) {
      return null;
    }

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
};

import { db } from "@/lib/db";

export const getPostsByUserId = async (userId: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true, // Include author data
      },
    });

    if (!posts) {
      return null;
    }

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
};