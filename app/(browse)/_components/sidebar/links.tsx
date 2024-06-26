"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import { LinkItem, LinkItemSkeleton } from "@/app/(browse)/_components/sidebar/link-item";
import { ReportProblem } from "@/app/(browse)/_components/sidebar/report-problem";
import { ProfileLink } from "@/app/(browse)/_components/sidebar/profile-link";
import {useCurrentUser} from "@/hooks/use-carrent-user";

export const Links = () => {
  const user = useCurrentUser();

  return (
      <div>
        <ul className="flex flex-col justify-between gap-x-3 h-[430px]">
          {sidebarLinks.map((link, index) => (
              <li key={index}>
                <LinkItem Icon={link.Icon} label={link.label} route={link.route} />
              </li>
          ))}
          <ReportProblem />
          {user && (
              <ProfileLink
                  route={`/profile/${user.id}`}
                  label="Profile"
                  image={user.image ?? undefined}
              />
          )}
        </ul>
      </div>
  );
};

export const LinksSkeleton = () => (
    <ul className="px-2 rounded-xl bg-black">
      {Array.from({ length: 9 }).map((_, i) => (
          <LinkItemSkeleton key={i} />
      ))}
    </ul>
);
