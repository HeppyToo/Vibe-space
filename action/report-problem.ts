"use server";

import { z } from "zod";
import { ReportSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const createProblemReport = async (
  values: z.infer<typeof ReportSchema>,
) => {
  const validateFields = ReportSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields provided! Please check the data format." };
  }

  const { content } = validateFields.data;

  const user = await currentUser();

  if (!user?.id) {
    return {
      error: "User not found. Please ensure the user exists and is logged in.",
    };
  }

  try {
    await db.reportContent.create({
      data: {
        description: content,
        reporterId: user.id,
      },
    });
  } catch (error) {
    console.error("Failed to report:", error);
    return { error: "Failed to report. Please try again later." };
  }

  return { success: "Report created successfully!" };
};
