import { db } from "@/lib/db";
import {Account} from "@/types";

export const getAccountByUserId = async (userId: string) : Promise<Account | null> => {
  if(!userId) {
    console.error("Invalid userId provided")
    return null
  }

  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error){
    console.error(`Error fetching account for userId: ${userId}`, error);
    return null;
  }
};
