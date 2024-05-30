
export const getPosts = async () => {
  try {
    const posts = await db.posts.findMany({
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

export const getPostsByUserId = async (id: string | undefined) => {
  try {
    const post = await db.posts.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true, // Include author data
      },
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};