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

        if (!conversationId) {
            console.error('No conversation ID provided');
            return null;
        }

        // Modified query to include user details
        const conversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: {
                    include: {
                        user: true, // Assuming 'user' is the field name in the relation table
                    }
                },
            },
        });

        // Optionally, transform the structure to match your needs
        const transformedConversation = {
            ...conversation,
            users: conversation?.users.map(u => u.user),
        };

        return transformedConversation;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

// export const getConversations = async () => {
//     const user = await currentUser();
//
//     if (!user?.id) {
//         return [];
//     }
//
//     try {
//         const conversations = await db.conversation.findMany({
//             orderBy: {
//                 lastMessageAt: 'desc',
//             },
//             where: {
//                 users: {
//                     some: {
//                         id: user.id
//                     }
//                 }
//             },
//             include: {
//                 users: true,
//                 messages: {
//                     include: {
//                         sender: true,
//                     }
//                 },
//             }
//         });
//
//         return conversations;
//     } catch (error: any) {
//         return [];
//     }
// };