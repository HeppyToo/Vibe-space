import { getConversationById } from "@/data/conversation";
import getMessages from "@/action/message";
import EmptyState from "@/components/browse/empty-state";
import Body from "@/app/(browse)/conversations/[conversationsId]/_components/body";
import { HeaderConversation } from "@/app/(browse)/conversations/[conversationsId]/_components/header-conversation";
import { FormConversation } from "@/app/(browse)/conversations/[conversationsId]/_components/form-conversation";

interface ConversationsPageProps {
    params: {
        conversationsId: string;
    };
}

const ChatId = async ({ params }: ConversationsPageProps ) => {
    try {
        const conversation = await getConversationById(params.conversationsId);
        const messages = await getMessages(params.conversationsId);

        if (!conversation || !conversation.users) {
            return (
                <div className="lg:pl-80 h-full">
                    <div className="h-full flex flex-col">
                        <EmptyState />
                    </div>
                </div>
            );
        }

        return (
            <div className="lg:pl-80 h-screen">
                <div className="h-full flex flex-col">
                    {/*// @ts-ignore*/}
                    <HeaderConversation conversation={conversation} />
                    {/*// @ts-ignore*/}
                    <Body initialMessages={messages} />
                    <FormConversation />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to load conversation or messages:", error);
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }
}

export default ChatId;
