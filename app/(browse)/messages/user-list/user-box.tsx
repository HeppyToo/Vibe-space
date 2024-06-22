"use client"

import {User} from "@prisma/client";

import React, {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {FaUser} from "react-icons/fa";

interface UserBoxProps {
 user: User
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>();

    return (
        <div>
            <div className="flex items-center rounded-md py-2 space-x-4 hover:bg-[#1f1f1f]/40" key={user?.id}>
                <Link href={`/profile/${user?.id}`}>
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-10 h-10  ml-2">
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
        </div>
    );
};

export default UserBox;