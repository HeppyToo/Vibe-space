import { db } from "@/lib/db";
import { Message } from "@prisma/client";

const getMessages = async (conversationId: string): Promise<Message[]> => {
    try {
        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                sender: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return messages;
    } catch (error: any) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
};

export default getMessages;
