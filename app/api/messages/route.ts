import { NextResponse } from "next/server";
import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";


export async function POST(
    request: Request,
) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const {
      message,
      image,
      conversationId
    } = body;

    if (!user?.id || !user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await db.message.create({
      include: {
        seen: true,
        sender: true
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: user.id }
        },
        seen: {
          connect: {
            id: user.id
          }
        },
      }
    });


    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: {
          include: {
            user: true
          }
        },
        messages: {
          include: {
            seen: true
          }
        }
      }
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map(({ user }) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:update', {
          id: conversationId,
          messages: [lastMessage]
        });
      }
    });

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 });
  }
}