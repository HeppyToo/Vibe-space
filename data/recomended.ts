import { db } from '@/lib/db';
import {currentUser} from "@/lib/auth";

export const getRecommended = async () => {
    let userId;

    try {
        const self = await currentUser();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let users;

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
          take: 5,
        });
    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    return users;
};