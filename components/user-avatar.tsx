import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {UserRole} from "@prisma/client";

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
  return (
    <Avatar className="w-10 h-10 ml-2">
      <AvatarImage src={user.image || ""} alt="User" className="outline-0" />
      <AvatarFallback className="bg-black outline-0">
        <FaUser className="text-white" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;