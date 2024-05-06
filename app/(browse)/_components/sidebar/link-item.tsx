"use client"

import React from "react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useSidebar} from "@/store/use-sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";

interface SidebarLink {
    image?: string;
    Icon?: React.ElementType;
    label: string;
    route: string;
}

export const LinkItem = ({Icon, image, label, route}: SidebarLink) => {
    const pathname = usePathname();

    const { collapsed } = useSidebar((state) => state);

    const isActive = pathname === route;

    return (
        <Button asChild variant={pathname === route ? "default" : "outline"} className={cn("bg-black border-0 w-full h-12", pathname === route && "text-lg bg-red-700")}>
            <Link href={route}>
                <div className="w-full p-4 flex justify-start gap-x-2 items-center">
                    {Icon ? <Icon className="w-6 h-6"/> : null}
                    {image ?  (
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={image} alt="User" className="outline-0"/>
                            <AvatarFallback className="bg-black outline-0">
                                <FaUser className="text-white"/>
                            </AvatarFallback>
                        </Avatar>
                    ) : null}
                    <p className="pl-3 text-md">{label}</p>
                </div>
            </Link>
        </Button>
    )
}