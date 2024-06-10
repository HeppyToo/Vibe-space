"use client"

import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Author } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import FollowButton from "@/app/(browse)/profile/_component/follow-button";
import { Search } from "@/components/browse/search";

interface ModalFollowersProps {
  children: React.ReactNode;
  authors: Author[];
  label: string;
}

export const ModalFollowers = ({
  children,
  authors,
  label,
}: ModalFollowersProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAuthors = authors.filter((author: Author) => {
    const name = author.name ? author.name.toLowerCase() : '';
    const username = author.username ? author.username.toLowerCase() : '';

    return name.includes(searchQuery.toLowerCase()) || username.includes(searchQuery.toLowerCase());
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-white bg-black border-slate-800/40">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Search value={searchQuery} setValue={setSearchQuery} filterFunction={() => filteredAuthors}/>
          {authors.length === 0 && <p>has no {label}</p>}
          {filteredAuthors.length === 0 ? (
              <p>{label} not found </p>
          ) : (
              filteredAuthors.map((author) => {
                return (
                    <div className="flex flex-row justify-between" key={`${author.id}`}>
                      <Link href={`${author.id}`} >
                        <div className="flex flex-row justify-start items-center">
                          <Avatar className="w-8 h-8 flex justify-center items-center">
                            <AvatarImage
                                src={author.image || ""}
                                alt="User"
                                className="outline-0"
                            />
                            <AvatarFallback className="bg-black outline-0 flex justify-center items-center">
                              <FaUser className="text-white w-8 h-8" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col pl-2 items-start">
                            <p className="text-lg">{author.name}</p>
                            <p className="text-sm">{author.username}</p>
                          </div>
                        </div>
                      </Link>
                      <div className="flex justify-center items-center">
                        <FollowButton userId={author.id} isFollowing={author.isFollowing} />
                      </div>
                    </div>
                );
              })
          )}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
