'use client';

import { HiChevronLeft } from "react-icons/hi";
import { useMemo, useState } from "react";
import Link from "next/link";
import useOtherUser from "@/hooks/use-other-user";
import useActiveList from "@/hooks/use-active-list";
import { User } from "@prisma/client";
import UserAvatar from "@/components/user-avatar";
import AvatarGroup from "@/components/ui/avatar-group";
import ProfileDrawer from "@/app/(browse)/conversations/[conversationsId]/_components/profile-drawer";
import {HiEllipsisHorizontal} from "react-icons/hi2";

interface EnhancedHeaderProps {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  name: string | null;
  isGroup: boolean | null;
  users: User[];
}

interface Conversation {
  conversation: EnhancedHeaderProps;
}

export const HeaderConversation: React.FC<Conversation> = ({
                                                             conversation,
                                                           }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = useMemo(
      () => members.includes(otherUser?.email || ''),
      [members, otherUser]
  );

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [conversation.isGroup, conversation.users.length, isActive]);

  return (
      <>
        <ProfileDrawer
            data={conversation}
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        />
        <div className="bg-black w-full flex border-b-[1px] border-slate-600/40 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
          <div className="flex gap-3 items-center">
            <Link
                href="/conversations"
                className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
            >
              <HiChevronLeft size={32} />
            </Link>
            {conversation.isGroup ? (
                <AvatarGroup users={conversation.users} />
            ) : (
                <UserAvatar user={otherUser} />
            )}
            <div className="flex flex-col">
              <div>{conversation.name || otherUser?.name}</div>
              <div className="text-sm font-light text-neutral-500">
                {statusText}
              </div>
            </div>
          </div>
          <HiEllipsisHorizontal
              size={32}
              onClick={() => setDrawerOpen(true)}
              className="text-slate-600/80 cursor-pointer hover:text-slate-400 transition"
          />
        </div>
      </>
  );
};
