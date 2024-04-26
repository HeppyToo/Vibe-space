'use client';

import * as z from 'zod'

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {LoginSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/action/login";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked"
        ? "Email already in use with different provider"
        : "";

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
                form.reset()
            })

        })
    }

    return (
        <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocialLogin>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-4'>
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='serhii.doe@gmail.com' type='email'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} {...field} placeholder='******' type='password'/>
                                </FormControl>
                                <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className='px-0 font-normal text-white'
                                >
                                    <Link href="/auth/reset">
                                        Forgot password?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                    <FormError massage={error || urlError}/>
                    <FormSuccess massage={success}/>
                    <Button type='submit' className='w-full bg-muted-foreground/70 hover:border border-muted-foreground/70' disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}