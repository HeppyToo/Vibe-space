"use client"

import React from 'react';

import { cn } from '@/lib/utils';
import { useIsClient } from 'usehooks-ts';

import { useSidebar } from '@/store/use-sidebar';

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({children} : WrapperProps) => {
    const isClient = useIsClient();
    const { collapsed } = useSidebar((state) => state);

    if(!isClient) {
        return (
            <aside
                className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-black border-r border-slate-800/40 Z-50">
                <div>Skeleton</div>
            </aside>
        )
    }

    return (
        <aside className={cn(
            'fixed left-0 flex flex-col justify-between w-60 h-screen bg-black border-r border-slate-800/40 text-white Z-50',
            collapsed && 'w-[70px]'
        )}>
        {children}
        </aside>
    )
}