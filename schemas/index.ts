import * as z from 'zod';

export const  LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {message: 'Password is required'}),
});

export const  RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {message: 'Minimum 6 characters required'}),
    name: z.string().min(4, {message: 'Minimum 4 characters required'}),
});