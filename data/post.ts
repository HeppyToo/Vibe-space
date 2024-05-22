import { db } from "@/lib/db";

export const getPostsAndAuthor = async () => {
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
