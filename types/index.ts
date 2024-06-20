import {UserRole} from "@prisma/client";
export interface User {
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
    title: string;
    content: string;
    imageUrl: string;
    tags: string[];
    author: {
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
    };
    likeCount: number;
    saveCount: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null ;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
}