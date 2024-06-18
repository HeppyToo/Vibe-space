import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import React from "react";
import { Author } from "@/types";
import FollowButton from "@/app/(browse)/profile/_component/follow-button";

interface UserCardProps {
  user: Author;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div
      className="flex items-center space-x-4 w-full rounded-md  border border-1 border-slate-600/40 justify-between p-4"
      key={user.id}
    >
      <Link href={`/profile/${user.id}`}>
        <div className="flex items-center space-x-2">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user.image || ""}
              alt="User"
              className="outline-0"
            />
            <AvatarFallback className="bg-black outline-0">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="pl-2">
            <p className="font-bold text-md">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.username}</p>
          </div>
        </div>
      </Link>

      <FollowButton userId={user.id} isFollowing={user.isFollowing || false} />
    </div>
  );
};
