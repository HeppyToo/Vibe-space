import React from "react";

import { IoMdHome } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaRegCompass } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { RiMessengerLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";

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
    Icon: RiMessengerLine,
    route: "/conversations",
    label: "Messages",
  },
  {
    Icon: IoMdAddCircleOutline,
    route: "/create",
    label: "Create",
  },
];

export const sidebarMenuLinks: SidebarLink[] = [
  {
    Icon: IoIosSettings,
    route: "/settings",
    label: "Settings",
  },
  {
    Icon: CiSaveDown2,
    route: "/saved",
    label: "Saved",
  },
];
