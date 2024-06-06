import {db} from "@/lib/db";

import { currentUser } from "@/lib/auth";

export const getFollowedUsers = async () => {
  try {
    const self = await currentUser();

    if (!self) {
      return { error: "Not authenticated" };
    }

    return db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: true,
      },
    });
  } catch (error) {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await currentUser();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });


    if (!otherUser) {
      return { error: "User not found" };
    }

    if (otherUser.id === self?.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self?.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
};

export const followUser = async (id: string) => {
  const self = await currentUser();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self?.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self?.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const followerId = typeof self?.id === "string" ? self.id : "";

  return db.follow.create({
    data: {
      followerId,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
};

export const unfollowUser = async (id: string) => {
  const self = await currentUser();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self?.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self?.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  return db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
};

export const getFollowersCount = async (userId: string) => {
  try {
    const followers = await db.follow.findMany({
      where: {
        followingId: userId,
      },
    });

    return followers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFollowingCount = async (userId: string) => {
  try {
    const following = await db.follow.findMany({
      where: {
        followerId: userId,
      },
    });

    return following;
  } catch (error) {
    console.error(error);
    return [];
  }
};
