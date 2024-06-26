'use server';

import {deletePostById} from "@/data/post";
import { revalidatePath } from 'next/cache';

export const onDeletePost = async (id: string) => {
    try {
        const post = await deletePostById(id);

        revalidatePath('/');

        if (post && 'following' in post) {
            revalidatePath(`/post/${post.id}`);
        }

        return post;
    } catch (error) {
        throw new Error('Internal Error');
    }
};