"use client"

import {CiSearch} from "react-icons/ci";
import {User} from "@/types";
import {UserCard} from "@/app/(browse)/search/_component/user-card";
import React, {useState} from "react";
import {Search} from "@/components/browse/search";

interface ClientCardComponentProps {
    users: User[];
}

export const SearchCardComponent: React.FC<ClientCardComponentProps> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAuthors = users.filter((author: User) => {
        const name = author.name ? author.name.toLowerCase() : '';
        const username = author.username ? author.username.toLowerCase() : '';

        return name.includes(searchQuery.toLowerCase()) || username.includes(searchQuery.toLowerCase());
    });

    return(
        <>
            <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
                <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]">
                    Search Users
                </h2>
                <div className="relative flex gap-1 px-4 w-full rounded-lg">
                    <CiSearch className="absolute top-0 left-0 ml-6 mt-3 w-4 h-4"/>
                    <Search value={searchQuery} setValue={setSearchQuery} filterFunction={() => filteredAuthors} className="w-full"/>
                </div>
            </div>

            <div className="w-full flex flex-col items-center gap-6 py-10 pt-5 max-w-5xl px-4">
                {filteredAuthors?.map((user: User) => <UserCard key={user.id} user={user}/>)}
            </div>
        </>
    )
}