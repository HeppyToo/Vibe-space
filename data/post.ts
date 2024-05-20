import { db } from "@/lib/db";

export const getPosts = async () => {
    try {
        const posts = await db.posts.findMany();
        return posts;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getResendPosts = async () => {
    try {
        const posts = await db.posts.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return posts;
    } catch (error) {
        console.error(error);
        return null;
    }
};