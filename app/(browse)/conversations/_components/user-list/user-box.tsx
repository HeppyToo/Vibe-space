'use client';

import { User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import useActiveList from "@/hooks/use-active-list";
import { cn } from "@/lib/utils";

interface UserBoxProps {
    user: User;
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { members } = useActiveList();
    const isActive = members.includes(user.email);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', { userId: user.id })
            .then(data => {
                router.push(`/conversations/${data.data.id}`);
            })
            .catch(error => {
                console.error('Axios error:', error.response || error.message);
            })
            .finally(() => setIsLoading(false));
    }, [user.id, router]);

    return (
        <div onClick={handleClick} className="relative cursor-pointer">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="loader">Loading...</div>
                </div>
            )}
            <div
                className={cn(
                    "flex items-center rounded-md py-2 space-x-4 hover:bg-[#1f1f1f]/40",
                    isActive && "bg-[#1f1f1f]/40"
                )}
                key={user.id}
            >
                <div className="flex items-center space-x-2">
                    <Avatar className="w-10 h-10 ml-2">
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
                        <p className="font-bold text-md">{user.name}</p>
                        <p className="text-gray-500 text-sm">{user.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBox;
