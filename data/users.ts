import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const getAllUsers = async () => {
    let userId;

    try {
        const self = await currentUser();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let users;

    if (userId) {
        // Fetch the list of users that the current user is following
        const following = await db.follow.findMany({
            where: {
                followerId: userId,
            },
        });

        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Add the isFollowing field to each user
        users = users.map(user => ({
            ...user,
            isFollowing: following.some(follow => follow.followingId === user.id),
        }));

    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    return users;
};