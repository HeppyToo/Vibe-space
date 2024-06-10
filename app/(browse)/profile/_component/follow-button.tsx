"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onFollow, onUnfollow } from "@/data/follow-cache";

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean | { error: string };
}

const FollowButton = ({ userId, isFollowing }: FollowButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  if (typeof isFollowing === "object" && isFollowing.error) {
    return <Button disabled>{isFollowing.error}</Button>;
  }

  return (
    <Button disabled={isPending} onClick={onClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
