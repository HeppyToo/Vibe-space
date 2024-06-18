"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unblockUser } from "@/action/block";
import {addLikeToPost, removeLikeFromPost} from "@/action/like";

export const onLike = async (id: string) => {
    const likePost = await addLikeToPost(id);

    revalidatePath("/");

    if (likePost) {
        if (typeof likePost !== "boolean") {
            revalidatePath(`post/${likePost.id}`);
        }
    }

    return likePost;
};

export const onUnLike = async (id: string) => {
    const unLikePost = await removeLikeFromPost(id);

    revalidatePath("/");

    if (unLikePost) {
        revalidatePath(`post/${unLikePost.id}`);
    }

    return unLikePost;
};
