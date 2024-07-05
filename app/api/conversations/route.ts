import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            create: [
              ...members.map((member: { value: string }) => ({
                user: { connect: { id: member.value } },
              })),
              {
                user: { connect: { id: user.id } },
              },
            ],
          },
        },
        include: {
          users: {
            include: {
              user: true,
            },
          },
        },
      });

      // Update all connections with new conversation
      newConversation.users.forEach(({ user }) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
        AND: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        users: {
          create: [
            {
              user: { connect: { id: user.id } },
            },
            {
              user: { connect: { id: userId } },
            },
          ],
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    // Update all connections with new conversation
    newConversation.users.forEach(({ user }) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
