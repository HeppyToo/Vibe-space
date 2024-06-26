"use client";

import React, { useTransition, useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deletePostById } from "@/data/post";
import {onDeletePost} from "@/data/post-cashe";

interface LikedPostButtonProps {
  postId: string;
  userId?: string;
  postIdCreator: string;
}

export const PostDeleteButton: React.FC<LikedPostButtonProps> = ({
  postId,
  userId,
  postIdCreator,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDeletePost = useCallback(() => {
    startTransition(() => {
      onDeletePost(postId)
        .then(() => toast.success("You'll delet this post."))
        .catch(() => toast.error("Something went wrong"));
    });
  }, [postId]);

  return (
    <Button
      onClick={handleDeletePost}
      variant="ghost"
      className={`ost_details-delete_btn ${
        userId !== postIdCreator && "hidden"
      }`}
    >
      <MdDeleteOutline className="text-red-500 w-5 h-5" />
    </Button>
  );
};
