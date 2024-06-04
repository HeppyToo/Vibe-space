import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { username } });

    if (!user) {
      console.error(`User with username ${username} not found`);
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
};

export const getUserByUserId = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      console.error(`User with id ${id} not found`);
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};