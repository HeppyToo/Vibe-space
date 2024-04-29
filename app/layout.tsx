import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";
import React from 'react';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Vibe space",
    description: "A simple social media platform",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en">
            <body className={inter.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="sustem"
                storageKey="vibeSpace-them">{children}</ThemeProvider>
            </body>
            </html>
        </SessionProvider>

    );
}
