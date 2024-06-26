"use client";

import React, { useTransition, useCallback } from "react";
import { toast } from "sonner";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { onLike, onUnLike } from "@/data/like-cache";
import {Button} from "@/components/ui/button";

interface LikedPostButtonProps {
    postId: string;
    isLiked: boolean | { error: string };
    setIsHovered: (value: boolean) => void;
    isHovered: boolean;
}

export const LikedPostButton: React.FC<LikedPostButtonProps> = ({
                                                                    postId,
                                                                    isLiked,
                                                                    setIsHovered,
                                                                    isHovered,
                                                                }) => {
    const [isPending, startTransition] = useTransition();

    const handleLike = useCallback(() => {
        startTransition(() => {
            onLike(postId)
                .then(() => toast.success("You'll like this post."))
                .catch(() => toast.error("Something went wrong"));
        });
    }, [postId]);

    const handleUnLike = useCallback(() => {
        startTransition(() => {
            onUnLike(postId)
                .then(() => toast.success("You don't like this post."))
                .catch(() => toast.error("Something went wrong"));
        });
    }, [postId]);

    const onClick = () => {
        isLiked ? handleUnLike() : handleLike();
    };

    if (typeof isLiked === "object" && isLiked.error) {
        return <Button disabled>{isLiked.error}</Button>;
    }

    const renderIcon = () => {
        const IconComponent = isHovered ? (isLiked ? FaHeartBroken : FaHeart) : (isLiked ? FaHeart : FaHeart);
        const iconColor = isHovered || isLiked ? "red" : "white";

        return <IconComponent className="cursor-pointer text-center w-5 h-5" color={iconColor} />;
    };

    return (
        <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isPending}
            onClick={onClick}
            className="flex bg-[#1f1f1f] hover:bg-[#1f1f1f] p-0"
        >
            {renderIcon()}
        </Button>
    );
};
