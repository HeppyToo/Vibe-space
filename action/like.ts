import {currentUser} from "@/lib/auth";

import {db} from "@/lib/db";

export const addLikeToPost = async (postId: string) => {
    const self = await currentUser();

    const existingLike = await db.like.findFirst({
        where: {
            userId: self?.id,
            postId: postId,
        },
    });

    if (existingLike) {
        throw new Error("Already liked");
    }

    const userId = typeof self?.id === "string" ? self.id : "";

    return db.like.create({
        data: {
            userId,
            postId: postId,
        },
    });
};

export const removeLikeFromPost = async (postId: string) => {
    const self = await currentUser();

    const existingLike = await db.like.findFirst({
        where: {
            userId: self?.id,
            postId: postId,
        },
    });

    if (!existingLike) {
        throw new Error("No like found");
    }

    return db.like.delete({
        where: {
            id: existingLike.id,
        },
    });
};

export const isPostLikedByUser = async (postId: string) => {
    const self = await currentUser();

    const existingLike = await db.like.findFirst({
        where: {
            userId: self?.id,
            postId: postId,
        },
    });

    return !!existingLike;
};