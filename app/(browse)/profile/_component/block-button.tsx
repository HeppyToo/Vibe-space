"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {onBlock} from "@/data/block-cashe";

import { toast } from "sonner";

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Button disabled={isPending} onClick={handleBlock}>
      Block
    </Button>
  );
};

export default FollowButton;
