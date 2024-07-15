"use client";

import React, { useEffect } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { BeatLoader } from "react-spinners";
import { usePathname } from "next/navigation";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const pathname = usePathname();
  const isClient = useIsClient();
  const matches = useMediaQuery("(min-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (pathname === "/conversations" || pathname?.startsWith("/conversations/")) {
      onCollapse();
    } else if (matches) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [matches, onCollapse, onExpand, pathname]);

  if (!isClient) {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
          <BeatLoader color="white" />
        </div>
    );
  }

  return (
      <section
          className={cn("flex-1", collapsed ? "md:ml-[70px]" : "md:ml-[70px] lg:ml-60")}
      >
        {children}
      </section>
  );
};
