import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        if (!params?.conversationsId) {
            return '';
        }

        return params.conversationsId as string;
    }, [params?.conversationsId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId]);
};

export default useConversation;