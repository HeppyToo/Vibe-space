"use server"

import * as z from "zod"

import {RegisterSchema} from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.parse(values)

    if(!validatedFields) {
        return { error: "Invalid fields!"}
    }

    return { success: "Email send!"}
}