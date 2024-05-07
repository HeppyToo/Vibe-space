import React from "react";

import {IoMdHome} from "react-icons/io";
import { CiDark } from "react-icons/ci";
import {FaRegHeart} from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import {IoMdSearch} from "react-icons/io";
import {FaRegCompass} from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import {FaClapperboard} from "react-icons/fa6";
import {FaFacebookMessenger} from "react-icons/fa";
import {IoMdAddCircleOutline} from "react-icons/io";


interface SidebarLink {
    Icon: React.ElementType;
    route: string;
    label: string;
}

export const sidebarLinks: SidebarLink[] = [
    {
        Icon: IoMdHome,
        route: "/",
        label: "Home",
    },
    {
        Icon: IoMdSearch,
        route: "/search",
        label: "Search",
    },
    {
        Icon: FaRegCompass,
        route: "/explore",
        label: "Explore",
    },
    {
        Icon: FaClapperboard,
        route: "/reels",
        label: "Reels",
    },
    {
        Icon: FaFacebookMessenger,
        route: "/messages",
        label: "Messages",
    },
    {
        Icon: FaRegHeart,
        route: "/notifications",
        label: "Notifications",
    },
    {
        Icon: IoMdAddCircleOutline,
        route: "/create",
        label: "Create",
    }
];

export const sidebarMenuLinks: SidebarLink[] = [
    {
        Icon: IoIosSettings,
        route: "/settings",
        label: "Settings",
    },
    {
        Icon: FiActivity,
        route: "/activity",
        label: "Activity",
    },
    {
        Icon: CiSaveDown2,
        route: "/saved",
        label: "Saved",
    },
];