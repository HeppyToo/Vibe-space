"use client";

import React, { useState } from "react";
import { LikedPostButton } from "@/components/browse/like-post-button";
import { CiBookmark } from "react-icons/ci";
import { PostSaveButton } from "@/components/browse/post-save-button";

interface PostStatsProps {
  postId: string;
  isLiked: boolean | { error: string };
  isSaved: boolean | { error: string };
  likeCount: number;
}

export const PostStats = ({
  postId,
  isLiked,
  isSaved,
  likeCount,
}: PostStatsProps) => {
  const [isHoveredLike, setIsHoveredLike] = useState(false);
  const [isHoveredSave, setIsHoveredSave] = useState(false);

  return (
    <div className={`flex justify-between items-center z-20`}>
      <div className="flex gap-2 mr-5 items-center">
        <LikedPostButton
          postId={postId}
          setIsHovered={setIsHoveredLike}
          isHovered={isHoveredLike}
          isLiked={isLiked}
        />
        <p className="small-medium lg:base-medium">{likeCount}</p>
      </div>

      <div className="flex gap-2 items-center">
        <PostSaveButton
          postId={postId}
          isSaved={isSaved}
          setIsHovered={setIsHoveredSave}
          isHovered={isHoveredSave}
        />
      </div>
    </div>
  );
};
