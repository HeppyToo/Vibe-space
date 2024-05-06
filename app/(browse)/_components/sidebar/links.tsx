"use client"

import React from "react";

import {sidebarLinks} from "@/constants";

import {LinkItem} from "@/app/(browse)/_components/sidebar/link-item";
import {useCurrentUser} from "@/hooks/use-carrent-user";

interface SidebarLink {
    Icon: React.ElementType;
    route: string;
    label: string;
}

export const Links = () => {
    const user = useCurrentUser()

    console.log(user?.image)

    return (
        <div>
            <ul className="flex flex-col justify-between gap-x-3 h-[430px]">
                {sidebarLinks.map((link, index) => {
                    return (
                        <li key={index}>
                            <LinkItem Icon={link.Icon} label={link.label} route={link.route}/>
                        </li>
                    )
                })}
                <LinkItem image={user?.image || undefined} label="profile" route="/account"/>
            </ul>
        </div>
    )
}