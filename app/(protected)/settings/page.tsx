"use client"

import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {useSession} from "next-auth/react";

import {SettingsSchema} from "@/schemas";

import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { CiSettings } from "react-icons/ci";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/action/settings";
import {Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useCurrentUser} from "@/hooks/use-carrent-user";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";
import {UserRole} from "@prisma/client";

const SettingsPage = () => {
    const user = useCurrentUser();

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const {update} = useSession()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if(data.error) {
                        setError(data.error)
                    }

                    if(data.success) {
                        setSuccess(data.success)
                        update()
                    }
                }).catch(() => {setError("Something went wrong")})
        })
    }

    return (
        <Card className="w-[600px] bg-black border-slate-800/40 text-white">
            <CardHeader>
                    <p className="text-2xl font-semibold text-center flex gap-3 justify-center items-center">
                        <CiSettings/> Settings
                    </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl className="text-white">
                                        <Input {...field} placeholder="Serhii Bax" type="text" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            {user?.isOAuth === false && (<>
                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="text-white">
                                        <Input {...field} placeholder="serhii.doe@gmail.com" type="email" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="password" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl className="text-white">
                                        <Input {...field} placeholder="******" type="password" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="newPassword" render={({field}) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl className="text-white">
                                        <Input {...field} placeholder="serhii.doe@gmail.com" type="password" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            </>)}
                            <FormField control={form.control} name="role" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent  className="bg-[#1F1F22] text-white border-2">
                                            <SelectItem value={UserRole.ADMIN}>
                                                Admin
                                            </SelectItem>
                                            <SelectItem value={UserRole.USER}>
                                                User
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            {user?.isOAuth === false && (<>
                            <FormField control={form.control} name="isTwoFactorEnabled" render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm text-white bg-[#1F1F22] border-0">
                                    <div className="space-y-0.5">
                                        <FormLabel>Two Factor Authentication</FormLabel>
                                        <FormDescription>
                                            Enable two factor authentication for your account
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            </>)}
                        </div>
                        <FormSuccess massage={success}/>
                        <FormError massage={error}/>
                        <Button type="submit" disabled={isPending}>Save</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;