import { currentUser } from "@/lib/auth";

import {db} from "@/lib/db";

export const savePost = async (postId: string) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    const existingSavedPost = await db.savedPost.findFirst({
        where: {
            userId: user.id,
            postId: postId,
        },
    });

    if (existingSavedPost) {
        throw new Error("Post already saved");
    }

    return db.savedPost.create({
        data: {
            userId: user.id!, // Assert that user.id is not undefined
            postId: postId,
        },
    });
};

export const removeSavedPost = async (postId: string) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    const existingSavedPost = await db.savedPost.findFirst({
        where: {
            userId: user.id,
            postId: postId,
        },
    });

    if (!existingSavedPost) {
        throw new Error("No saved post found");
    }

    return db.savedPost.delete({
        where: {
            id: existingSavedPost.id,
        },
    });
};