import {UserRole} from "@prisma/client";

export interface Author {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    password: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    isTwoFactorEnabled: boolean;
    isFollowing: boolean;
}