"use client";

import React from "react";

import { sidebarLinks } from "@/constants";

import {
  LinkItem,
  LinkItemSkeleton,
} from "@/app/(browse)/_components/sidebar/link-item";
import { useCurrentUser } from "@/hooks/use-carrent-user";
import { ReportProblem } from "@/app/(browse)/_components/sidebar/report-problem";

interface SidebarLink {
  Icon: React.ElementType;
  route: string;
  label: string;
}

export const Links = () => {
  const user = useCurrentUser();

  return (
    <div>
      <ul className="flex flex-col justify-between gap-x-3 h-[430px]">
        {sidebarLinks.map((link, index) => {
          return (
            <li key={index}>
              <LinkItem
                Icon={link.Icon}
                label={link.label}
                route={link.route}
              />
            </li>
          );
        })}
        <ReportProblem />
        <LinkItem
          image={user?.image || undefined}
          label="Profile"
          route="/account"
        />
      </ul>
    </div>
  );
};

export const LinksSkeleton = () => {
  return (
    <ul className="px-2 rounded-xl bg-black">
      {[...Array(9)].map((_, i) => (
        <LinkItemSkeleton key={i} />
      ))}
    </ul>
  );
};
