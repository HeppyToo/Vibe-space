import { getConversationById } from "@/data/conversation";
import getMessages from "@/action/message";
import EmptyState from "@/components/browse/empty-state";
import Body from "@/app/(browse)/conversations/[conversationsId]/_components/body";
import {HeaderConversation} from "@/app/(browse)/conversations/[conversationsId]/_components/header-conversation";
import {FormConversation} from "@/app/(browse)/conversations/[conversationsId]/_components/form-conversation";

interface ConversationsPageProps {
    params: {
        conversationsId: string;
    };
}

const ChatId = async ({ params }: ConversationsPageProps ) => {
    const conversation = await getConversationById(params.conversationsId);
    const messages = await getMessages(params.conversationsId);

    if (!conversation || !conversation?.users) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
      <div className="lg:pl-80 h-screen">
        <div className="h-full flex flex-col">
          <HeaderConversation conversation={conversation} />
          {/*<Body initialMessages={messages} />*/}
          <FormConversation />
        </div>
      </div>
    );
}

export default ChatId;