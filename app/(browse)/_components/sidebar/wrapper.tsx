"use client";

import React from "react";

import { useSidebar } from "@/store/use-sidebar";

import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import { LinksSkeleton } from "@/app/(browse)/_components/sidebar/links";
import { ToggleSkeleton } from "@/app/(browse)/_components/sidebar/toggle";
import { BurgerMenuSkeleton } from "@/app/(browse)/_components/sidebar/burger-menu";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="hidden md:flex fixed left-0 flex-col w-[70px] lg:w-60 h-full justify-between bg-black border-r border-slate-800/40 Z-50">
        <ToggleSkeleton />
        <LinksSkeleton />
        <BurgerMenuSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "hidden fixed left-0 md:flex flex-col justify-between w-60 h-screen bg-black border-r border-slate-800/40 text-white Z-50",
        collapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
