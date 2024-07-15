"use client";

import React from "react";
import Link from "next/link";
import { useSidebar } from "@/hooks/use-sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarLink {
    image?: string;
    Icon?: React.ElementType;
    label: string;
    route: string;
}

export const LinkItem = ({ Icon, image, label, route }: SidebarLink) => {
    const pathname = usePathname();
    const { collapsed } = useSidebar((state) => state);
    const isActive = pathname === route;

    return (
        <Button
            asChild
            variant={isActive ? "default" : "outline"}
            className={cn(
                "bg-black border-0 w-full h-12",
                isActive && "text-lg bg-[#1F1F22]"
            )}
        >
            <Link href={route}>
                <div className="w-full flex items-center gap-x-2 p-0">
                    {Icon && <Icon className="w-6 h-6" />}
                    {!collapsed && <p className="pl-3 text-md">{label}</p>}
                </div>
            </Link>
        </Button>
    );
};

export const LinkItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2 bg-black my-3 rounded-xl">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full bg-[#1f1f1f]" />
            <div className="flex-1">
                <Skeleton className="h-6 bg-[#1f1f1f]" />
            </div>
        </li>
    );
};
