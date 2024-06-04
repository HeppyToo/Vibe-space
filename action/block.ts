import { db } from "@/lib/db";

import { currentUser } from "@/lib/auth";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await currentUser();

    if (self?.id === undefined ) {
      return false;
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === self?.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self?.id,
          blockedId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await currentUser();

  if (self?.id === undefined ) {
    return false;
  }

  if (self.id === id) {
    throw new Error('Cannot block yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error('Already blocked');
  }

  return db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
};

export const unblockUser = async (id: string) => {
  const self = await currentUser();

  if (self?.id === undefined ) {
    return false;
  }

  if (self.id === id) {
    throw new Error('Cannot unblock yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error('Not blocked');
  }

  return db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });
};