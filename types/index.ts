import {UserRole} from "@prisma/client";
export interface Author {
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
    isFollowing?: boolean | { error: string; }; // Add this line
}

export interface Post {
    id: string;
    content: string;
    location: string;
    tags: string[];
    imageUrl: string;
    published: boolean;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
    isFollowing?: boolean | { error: string; };
}