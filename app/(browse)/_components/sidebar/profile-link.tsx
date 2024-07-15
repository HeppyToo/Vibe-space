"use client";

import React from "react";
import Link from "next/link";
import { useSidebar } from "@/hooks/use-sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

interface SidebarLink {
    image?: string;
    label: string;
    route: string;
}

export const ProfileLink = ({ image, label, route }: SidebarLink) => {
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
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={image || ""} alt="User" className="outline-0" />
                        <AvatarFallback className="bg-black outline-0">
                            <FaUser className="text-white" />
                        </AvatarFallback>
                    </Avatar>
                    {!collapsed && <p className="pl-3 text-md">{label}</p>}
                </div>
            </Link>
        </Button>
    );
};
