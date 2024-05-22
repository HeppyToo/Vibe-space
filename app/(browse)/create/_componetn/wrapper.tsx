"use client";

import React from "react";

import { useSidebar } from "@/store/use-sidebar";

import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import {BeatLoader} from "react-spinners";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    const isClient = useIsClient();
    const { collapsed } = useSidebar((state) => state);

    if (!isClient) {
      return (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="white" />
        </div>
      );
    }

    return (
      <div className="text-white min-h-screen w-full flex flex-1 flex-col gap-10 pt-10 px-5 md:px-8 lg:p-9">
        {children}
      </div>
    );
};
