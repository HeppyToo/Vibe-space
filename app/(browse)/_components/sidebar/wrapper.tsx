import {cn} from "@/lib/utils";
import React from 'react'

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({children} : WrapperProps) => {
    return (
        <aside className={cn(
            'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] Z-50 bg-black text-white',
        )}>
            {children}
        </aside>
    )
}