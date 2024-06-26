"use client";

import React, { useTransition, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {CiBookmark} from "react-icons/ci";
import {onSave, onUnSave} from "@/data/save-cashe";
import {FaBookmark} from "react-icons/fa";

interface PostSaveButtonProps {
    postId: string;
    isSaved: boolean | { error: string };
    setIsHovered: (value: boolean) => void;
    isHovered: boolean;
}

export const PostSaveButton: React.FC<PostSaveButtonProps> = ({
                                                                  postId,
                                                                  isSaved,
                                                                  setIsHovered,
                                                                  isHovered,
                                                              }) => {
    const [isPending, startTransition] = useTransition();

    const handleSave = useCallback(() => {
        startTransition(() => {
            onSave(postId)
                .then(() => toast.success("You've saved this post."))
                .catch(() => toast.error("Something went wrong"));
        });
    }, [postId]);

    const handleUnSave = useCallback(() => {
        startTransition(() => {
            onUnSave(postId)
                .then(() => toast.success("You unsaved this post."))
                .catch(() => toast.error("Something went wrong"));
        });
    }, [postId]);

    const onClick = () => {
        isSaved ? handleUnSave() : handleSave();
    };

    if (typeof isSaved === "object" && isSaved.error) {
        return <Button disabled>{isSaved.error}</Button>;
    }

    const renderIcon = () => {
        const IconComponent = isSaved ? FaBookmark : CiBookmark;
        const iconColor = isSaved ? (isHovered ? "#2a7396" : "#47c2ff") : "white";

        return <IconComponent className="w-[24px] h-[24px]" color={iconColor} />;
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
