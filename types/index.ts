import {Conversation, UserRole} from "@prisma/client";
import {Message} from "postcss";

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
    isFollowing?: boolean | { error: string; }; // Optional property
}

export interface Post {
    id: string;
    content: string;
    location: string;
    imageUrl: string;
    tags: string[];
    author: User;
    likeCount?: number;
    saveCount?: number;
    isLiked?: boolean;
    isSaved?: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
}

export type FullMessageType = Message & {
    sender: User,
    seen: User[]
};

export type FullConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[]
};