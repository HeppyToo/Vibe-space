"use client";

import React from "react";

import { useEffect } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

import { useSidebar } from "@/store/use-sidebar";
import { BeatLoader } from "react-spinners";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const isClient = useIsClient();
  const matches = useMediaQuery("(min-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [matches, onCollapse, onExpand]);

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
