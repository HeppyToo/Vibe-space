"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unblockUser } from "@/action/block";

export const onBlock = async (id: string) => {
  const blockedUser = await blockUser(id);

  revalidatePath("/");

  if (blockedUser) {
    if (typeof blockedUser !== "boolean") {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }
  }

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const unBlockedUser = await unblockUser(id);

  revalidatePath("/");

  if (unBlockedUser) {
    revalidatePath(`/${unBlockedUser.blocked.username}`);
  }

  return unBlockedUser;
};
