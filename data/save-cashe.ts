"use server";

import { revalidatePath } from "next/cache";
    import {removeSavedPost, savePost} from "@/action/save";

export const onSave = async (id: string) => {
    const likePost = await savePost(id);

    revalidatePath("/");

    if (likePost) {
        if (typeof likePost !== "boolean") {
            revalidatePath(`post/${likePost.id}`);
        }
    }

    return likePost;
};

export const onUnSave = async (id: string) => {
    const unLikePost = await removeSavedPost(id);

    revalidatePath("/");

    if (unLikePost) {
        revalidatePath(`post/${unLikePost.id}`);
    }

    return unLikePost;
};
