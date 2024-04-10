'use client';
import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {Social} from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";
interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocialLogin?: boolean;
}

function CardWrapper({ children, headerLabel, backButtonLabel, backButtonHref, showSocialLogin } : CardWrapperProps) {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocialLogin && (
            <CardFooter>
                <Social/>
            </CardFooter>)}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                href={backButtonHref}/>
            </CardFooter>
        </Card>
    );
}

export default CardWrapper;