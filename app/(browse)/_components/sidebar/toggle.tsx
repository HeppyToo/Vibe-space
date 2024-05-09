"use client";

import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Logo } from "@/app/(browse)/_components/sidebar/logo";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <>
          <div className="mt-5 hidden lg:flex items-center justify-center pt-4">
            <Hint label={label} side={"right"} asChild>
              <Button onClick={onExpand} className="h-auto p-2" variant="ghost">
                <ArrowRightFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center justify-center pt-4 pl-3 lg:hidden">
            <Logo />
          </div>
        </>
      )}
      {!collapsed && (
        <div className="mt-4 p-3 pl-4 mb-2 flex items-center w-full">
          <div>
            <Logo />
          </div>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="mt-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full bg-black h-20 rounded-xl">
      <Skeleton className="w-[150px] h-[50px] bg-[#1f1f1f]" />
      <Skeleton className="h-6 w-6 bg-[#1f1f1f] mr-5" />
    </div>
  );
};
