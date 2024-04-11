"use server"

import * as z from "zod"

import {LoginSchema} from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.parse(values)

    if(!validatedFields) {
        return { error: "Invalid fields!"}
    }

    return { success: "Email send!"}
}