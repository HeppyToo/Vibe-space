"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/auth/logout-button";
import { FiMenu } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

import { sidebarMenuLinks } from "@/constants";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link";

export const BurgerMenu = () => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full pr-8 pb-8 pt-0 pl-0 ml-4 flex justify-start gap-x-4 items-center mb-4">
          <FiMenu className="w-6 h-6" />
          {!collapsed && <p className="pl-1 text-md"> More </p>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        className="w-60 bg-[#1f1f1f] text-white hover:bg-[#1F1F22] border border-slate-800/40 rounded-xl"
      >
        <DropdownMenuGroup>
          {sidebarMenuLinks.map((link) => {
            return (
              <Link href={link.route} key={link.label}>
                <DropdownMenuItem className="w-full p-4 flex justify-start gap-x-2 items-center">
                  <link.Icon className="w-6 h-6" />
                  {link.label}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LogoutButton>
            <DropdownMenuItem className="w-full p-4 pl-5 flex justify-start gap-x-2 items-center text-white">
              Sign Out
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BurgerMenuSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4 px-3 py-2 bg-black my-3 rounded-xl">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full bg-[#1f1f1f]" />
      <div className="flex-1">
        <Skeleton className="h-6 bg-[#1f1f1f]" />
      </div>
    </div>
  );
};
