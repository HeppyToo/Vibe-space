import { db } from "@/lib/db";
import {currentUser} from "@/lib/auth";

export const getPosts = async () => {
  let userId;

  try {
    const self = await currentUser();
    userId = self?.id;
  } catch {
    userId = null;
  }

  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
        Like: true, // Include Like data
        SavedPost: true, // Include SavedPost data
      },
    });

    if (!posts) {
      return null;
    }

    const postsWithLikeCountAndIsLikedAndIsSaved = posts.map(post => {
      const likeCount = post.Like.length;
      const isLiked = post.Like.some(like => like.userId === userId);
      const isSaved = post.SavedPost.some(savedPost => savedPost.userId === userId);
      const saveCount = post.SavedPost.length;

      return {
        ...post,
        likeCount,
        isLiked,
        isSaved,
        saveCount,
      };
    });

    return postsWithLikeCountAndIsLikedAndIsSaved;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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

export const getPostById = async (postId: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
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

export const deletePostById = async (postId: string) => {
  try {
    const post = await db.post.delete({
      where: {
        id: postId,
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