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
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {CiFilter} from "react-icons/ci";
import React from "react";
import {Post} from "@/types";


interface SortButtonProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export function SortButton({ posts, setPosts }: SortButtonProps) {
    function sortPostsByLikes() {
        const sortedPosts = [...posts].sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
        setPosts(sortedPosts);
    }
    
    function sortPostsBySaved() {
        const sortedPosts = [...posts].sort((a, b) => (b.saveCount ?? 0) - (a.saveCount ?? 0));
        setPosts(sortedPosts);
    }

    function sortPostsByDateDescending() {
        const sortedPosts = [...posts].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
    }

    function sortPostsByDateAscending() {
        const sortedPosts = [...posts].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setPosts(sortedPosts);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-x-2">
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
                    <DropdownMenuItem onClick={sortPostsByDateAscending}>
                        <div className="flex">
                            <FaArrowUp className="mr-2 h-4 w-4" />
                            <span>Old</span>
                        </div>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sortPostsByDateDescending}>
                        <div className="flex">
                            <FaArrowDown className="mr-2 h-4 w-4" />
                            <span>New</span>
                        </div>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sortPostsByLikes}>
                        <div className="flex">
                            <CiHeart className="mr-2 h-4 w-4" />
                            <span>Likes</span>
                        </div>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sortPostsBySaved}>
                        <div className="flex">
                            <CiBookmark className="mr-2 h-4 w-4" />
                            <span>Saved</span>
                        </div>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
