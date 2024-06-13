"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-carrent-user";
import Link from "next/link";

export const SessionUser = () => {
  const user = useCurrentUser();

  return (
      <div className="flex items-center space-x-4">
        <Link href={`/profile/${user?.id}`}>
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                  src={user?.image || ""}
                  alt="User"
                  className="outline-0"
              />
              <AvatarFallback className="bg-black outline-0">
                <FaUser className="text-white"/>
              </AvatarFallback>
            </Avatar>
            <div className="pl-2">
              <p className="font-bold text-md">{user?.name}</p>
                <p className="text-gray-500 text-sm">{user?.username}</p>
            </div>
          </div>
        </Link>
      </div>
  );
};