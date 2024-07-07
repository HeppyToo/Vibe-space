'use client';

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { find } from "lodash";
import { FullMessageType } from "@/types";
import useConversation from "@/hooks/use-conversation";
import { pusherClient } from "@/lib/pusher";
import MessageBox from "@/app/(browse)/conversations/[conversationsId]/_components/message-box";
import { toast } from "sonner";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
    const { conversationId } = useConversation();

    useEffect(() => {
        if (!conversationId) {
            console.log('No conversationId found');
            return;
        }

        const markAsSeen = async () => {
            try {
                await axios.post(`/api/conversations/${conversationId}/seen`);
            } catch (error) {
                toast.error('Failed to mark conversation as seen');
                console.error(error);
            }
        };

        markAsSeen();
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) return;

        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView();

        const messageHandler = async (message: FullMessageType) => {
            try {
                await axios.post(`/api/conversations/${conversationId}/seen`);
            } catch (error) {
                toast.error('Failed to mark message as seen');
                console.error(error);
            }

            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message];
            });

            bottomRef.current?.scrollIntoView();
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) =>
                current.map((currentMessage) =>
                    currentMessage.id === newMessage.id ? newMessage : currentMessage
                )
            );
        };

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        };
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div className="pt-3" ref={bottomRef} />
        </div>
    );
}

export default Body;
