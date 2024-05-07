"use client"

import React from "react"

import {useEffect} from 'react';
import {useMediaQuery} from 'usehooks-ts';
import {cn} from "@/lib/utils";

import {useSidebar} from "@/store/use-sidebar";

interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({children}: ContainerProps) => {
    const matches = useMediaQuery('(min-width: 1024px)');
    const {collapsed, onCollapse, onExpand} = useSidebar((state) => state);

    useEffect(() => {
        if(matches) {
            onExpand();
        } else {
            onCollapse();
        }
    }, [matches, onCollapse, onExpand]);

    return (
        <section className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </section>
    )
}