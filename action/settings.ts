"use server"

import * as z from 'zod';
import {SettingsSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {currentUser} from "@/lib/auth";
import {getUserByEmail, getUserById} from "@/data/user";
import {db} from "@/lib/db";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";
import {unstable_update} from "@/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()

    if(!user) {
        return { error: 'User not found' }
    }

    if(!user.id) {
        return { error: 'User id not found' }
    }

    const dbUser = await getUserById(user.id)

    if(!dbUser) {
        return { error: 'User not found' }
    }

    if(user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if(values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)

        if(existingUser && existingUser.id !== user.id) {
            return { error: 'Email already exists' }
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: 'Verification email sent' }
    }

    if(values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if(!passwordMatch) {
            return { error: 'Password does not match' }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    unstable_update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
            role: updatedUser.role

        }
    })

    return { success: "Settings updated!" }
}