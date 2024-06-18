"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addLikeToPost, removeLikeFromPost } from "@/action/like";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { onLike, onUnLike } from "@/data/like-cache";

interface FollowButtonProps {
  postId: string;
  isLiked: boolean | { error: string };
  setIsHovered: (value: boolean) => void;
  isHovered: boolean;
}

export const LikedPostButton = ({
                                  postId,
                                  isLiked,
                                  setIsHovered,
                                  isHovered,
                                }: FollowButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(() => {
      onLike(postId)
          .then((data) => {
            toast.success(`You'll like this post.`);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
    });
  };

  const handleUnLike = () => {
    startTransition(() => {
      onUnLike(postId)
          .then((data) => {
            toast.success(`You don't like this post`);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
    });
  };

  const onClick = () => {
    if (isLiked) {
      handleUnLike();
    } else {
      handleLike();
    }
  };

  if (typeof isLiked === "object" && isLiked.error) {
    return <Button disabled>{isLiked.error}</Button>;
  }

  return (
      <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isPending}
          onClick={onClick}
          className="flex bg-[#1f1f1f] hover:bg-[#1f1f1f] p-0"
      >
        {isHovered ? (
            isLiked ? (
                <FaHeartBroken
                    className="cursor-pointer text-center w-5 h-5"
                    color="red"
                />
            ) : (
                <FaHeart
                    className="cursor-pointer text-center w-5 h-5"
                    color="red"
                />
            )
        ) : isLiked ? (
            <FaHeart
                className="cursor-pointer text-center w-5 h-5"
                color="red"
            />
        ) : (
            <FaHeart className="cursor-pointer text-center w-5 h-5" color="white" />
        )}
      </Button>
  );
};