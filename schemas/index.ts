import * as z from 'zod';
import {UserRole} from "@prisma/client";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN
        , UserRole.USER]),
    email: z.optional(z.string().email({
        message: 'Email is required'
    })),
    password: z.optional(z.string().min(6, {message: 'Password is required'})),
    newPassword: z.optional(z.string().min(6, {message: 'Password is required'})),
}).refine((data) => {
    if(data.password && !data.newPassword) {
        return false;
    }

    return true;
}, {
    message: 'New password is required',
    path: ['newPassword']
}).refine((data) => {
    if(data.newPassword && !data.password) {
        return false;
    }

    return true;
}, {
    message: 'password is required',
    path: ['password']
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {message: 'Password is required'}),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {message: 'Password is required'}),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {message: 'Minimum 6 characters required'}),
    name: z.string().min(4, {message: 'Minimum 4 characters required'}),
});