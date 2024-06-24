import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const getConversationById = async (
    conversationId: string
) => {
    try {
        const user = await currentUser();

        if (!user?.email) {
            return null;
        }

        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            },
        });

        return conversation;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export const getConversations = async () => {
    const user = await currentUser();

    if (!user?.id) {
        return [];
    }

    try {
        const conversations = await db.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc',
            },
            where: {
                users: {
                    some: {
                        id: user.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                    }
                },
            }
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
};