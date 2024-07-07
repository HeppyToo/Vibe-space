import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaCircle, FaUser} from "react-icons/fa";
import {UserRole} from "@prisma/client";
import useActiveList from "@/hooks/use-active-list";

interface UserProps {
    id: string;
    name: string;
    username: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    password: string | null;
    role: UserRole; // Assuming UserRole is already defined elsewhere
    createdAt: Date;
    updatedAt: Date;
    isTwoFactorEnabled: boolean;
}

// Step 2: Update the AvatarProps Type Definition
interface AvatarProps {
    user: UserProps;
}

const UserAvatar = ({ user }: AvatarProps) => {
    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    console.log(isActive)

    return (
        <div className="relative inline-block"> {/* Wrap Avatar and active icon in a relative container */}
            <Avatar className="w-10 h-10 ml-2">
                <AvatarImage src={user.image || ""} alt="User" className="outline-0" />
                <AvatarFallback className="bg-black outline-0">
                    <FaUser className="text-white" />
                </AvatarFallback>
            </Avatar>
            {isActive && (
                <FaCircle className="absolute bottom-0 right-0 text-green-500 w-3 h-3" /> // Small green dot as an active indicator
            )}
        </div>
    );
};


export default UserAvatar;