import React from "react";
import { sidebarLinks } from "@/constants";

interface SidebarLink {
    imgUrl: React.ElementType; 
    label: string;
    route: string;
}

export const Content = () => {
    return (
        <>
            {sidebarLinks.map((link: SidebarLink, index: number) => {
                return (
                    <div>{link.label}</div>
                )
            })}
        </>
        )
}