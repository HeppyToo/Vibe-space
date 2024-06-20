import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {CiFilter} from "react-icons/ci";
import React from "react";
import {Post} from "@/types";


interface SortButtonProps {
    posts: Post[];
}
export function SortButton({ posts }: SortButtonProps) {
    function sortPostsByLikes(posts: Post[]): Post[] {
        return posts.sort((a, b) => b.likeCount - a.likeCount);
    }

    function sortPostsBySaved(posts: Post[]): Post[] {
        return posts.sort((a, b) => b.saveCount - a.saveCount);
    }

    function sortPostsByDateDescending(posts: Post[]): Post[] {
        return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    function sortPostsByDateAscending(posts: Post[]): Post[] {
        return posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-white">
            All
          </p>
          <CiFilter className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1f1f1f] border-slate-600/40 text-white">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaArrowUp className="mr-2 h-4 w-4" />
            <span>Old</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaArrowDown className="mr-2 h-4 w-4" />
            <span>New</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CiHeart className="mr-2 h-4 w-4" />
            <span>Likes</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CiBookmark className="mr-2 h-4 w-4" />
            <span>Saved</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
