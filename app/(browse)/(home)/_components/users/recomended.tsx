import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import {getRecommended} from "@/data/recomended";
import {UserRole} from "@prisma/client";
import FollowButton from "@/app/(browse)/profile/_component/follow-button";

interface User {
    id: string;
    name: string;
    username: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    password: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    isTwoFactorEnabled: boolean;
}

export const RecommendedUsers = async () => {
    const users =await getRecommended();

    return (
        <div className="pt-5">
            {users.map((user) => (
                <div className="flex items-center space-x-4" key={user.id}>
                    <Link href={`/profile/${user.id}`}>
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-10 h-10">
                                <AvatarImage
                                    src={user.image || ""}
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
            ))}
        </div>
    );
};