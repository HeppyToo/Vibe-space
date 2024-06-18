"use client";

import React, {useTransition} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {onSave, onUnSave} from "@/data/save-cashe";
import {CiBookmark} from "react-icons/ci";
import {FaBookmark} from "react-icons/fa";

interface FollowButtonProps {
    postId: string;
    isSaved: boolean | { error: string };
    setIsHovered: (value: boolean) => void;
    isHovered: boolean;
}

export const PostSaveButton = ({
                                   postId,
                                   isSaved,
                                   setIsHovered,
                                   isHovered,
                               }: FollowButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const handleLike = () => {
        startTransition(() => {
            onSave(postId)
                .then((data) => {
                    toast.success(`You'll save this post.`);
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    const handleUnLike = () => {
        startTransition(() => {
            onUnSave(postId)
                .then((data) => {
                    toast.success(`You don't save this post`);
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    const onClick = () => {
        if (isSaved) {
            handleUnLike();
        } else {
            handleLike();
        }
    };

    if (typeof isSaved === "object" && isSaved.error) {
        return <Button disabled>{isSaved.error}</Button>;
    }


    return (
        <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isPending}
            onClick={onClick}
            className="flex bg-[#1f1f1f] hover:bg-[#1f1f1f] p-0"
        >
            {isSaved ? (
                isHovered ? (
                    <FaBookmark className="w-[24px] h-[24px]" color="#2a7396"/>
                ) : (
                    <FaBookmark className="w-[24px] h-[24px]" color="#47c2ff"/>
                )
            ) : (
                isHovered ? (
                    <FaBookmark className="w-[24px] h-[24px]" color="#2a7396"/>
                ) : (
                    <CiBookmark className="w-[24px] h-[24px]" color="white"/>
                )
            )}
        </Button>
    );
}