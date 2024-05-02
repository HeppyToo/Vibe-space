import * as z from 'zod';
import { UserRole } from "@prisma/client";

const emailValidation = z.string()
    .email({ message: 'Invalid email format.' })
    .max(100, { message: 'Email must be less than 100 characters long.' });

const passwordValidation = z.string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(50, { message: 'Password must be less than 50 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain letters.' })
    .regex(/[0-9]/, { message: 'Password must contain numbers.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain special characters.' });

export const SettingsSchema = z.object({
    name: z.optional(z.string().min(1, { message: 'Name cannot be empty.' })),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.nativeEnum(UserRole),
    email: z.optional(emailValidation),
    password: z.optional(passwordValidation),
    newPassword: z.optional(passwordValidation),
}).superRefine((data, ctx) => {
    if (data.password && !data.newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'New password is required when changing password.',
            path: ['newPassword'],
        });
    }
    if (data.newPassword && !data.password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Current password is required when setting a new password.',
            path: ['password'],
        });
    }
});

export const NewPasswordSchema = z.object({
    password: passwordValidation,
});

export const ResetSchema = z.object({
    email: emailValidation,
});

export const LoginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
    name: z.string().min(4, { message: 'Name must be at least 4 characters long.' }),
});
