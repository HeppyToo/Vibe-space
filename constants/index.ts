import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaRegCompass } from "react-icons/fa6";

interface SidebarLink {
    imgUrl: React.ElementType;  // Assuming you are using IconType for icons.
    route: string;     // Use 'route' as it seems to be what you intend based on the object.
    label: string;
}

export const sidebarLinks: SidebarLink[] = [
    {
        imgUrl: IoMdHome,
        route: "/",
        label: "Home",
    },
    {
        imgUrl: IoMdSearch,
        route: "/search",
        label: "Search",
    },
    {
        imgUrl: FaRegCompass,
        route: "/explore",
        label: "Explore",
    }
];