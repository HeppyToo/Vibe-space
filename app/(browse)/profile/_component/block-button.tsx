"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {onBlock, onUnblock} from "@/data/block-cashe";

import { toast } from "sonner";

interface FollowButtonProps {
  userId: string;
}

const BlockButton: React.FC<FollowButtonProps> = ({ userId }) => {
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

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
          .then((data) =>
              toast.success(`Unblocked the user`),
          )
          .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
      <>
        <Button disabled={isPending} onClick={handleBlock}>
          Block
        </Button>
        <Button disabled={isPending} onClick={handleUnblock}>
          Unblock
        </Button>
      </>
  );
};

export default BlockButton;