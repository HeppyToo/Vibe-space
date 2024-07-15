"use client";

import { CiSearch } from "react-icons/ci";
import { Post } from "@/types";
import React, { useState, useMemo } from "react";
import { Search } from "@/components/browse/search";
import { GridPostList } from "@/components/browse/grid-post-list";

interface ClientCardComponentProps {
    posts: Post[];
}

function SortButton(props: {
  setPosts: (value: ((prevState: Post[]) => Post[]) | Post[]) => void;
  posts: Post[];
}) {
  return null;
}

export const PostCardComponent: React.FC<ClientCardComponentProps> = ({
  posts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedPosts, setSortedPosts] = useState(posts);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post: Post) => {
      const name = post.content ? post.content.toLowerCase() : "";
      const tags = post.tags.join(" ").toLowerCase();

      return (
        name.includes(searchQuery.toLowerCase()) ||
        tags.includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, sortedPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]">
          Search Posts
        </h2>
        <div className="relative flex gap-1 w-full rounded-lg">
          <CiSearch className="absolute top-0 left-0 ml-6 mt-3 w-4 h-4" />
          <Search
            value={searchQuery}
            setValue={handleSearch}
            filterFunction={() => filteredPosts}
            className="w-full px-0"
          />
        </div>
      </div>

      <div className="flex justify-between w-full max-w-5xl mt-8 mb-7">
        <h3 className="text-[18px] font-bold leading-[140%] md:text-[24px] md:tracking-tighter">
          Popular Today
        </h3>

        <div className="flex justify-center items-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <SortButton posts={filteredPosts} setPosts={setSortedPosts} />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        <GridPostList posts={filteredPosts} />
      </div>
    </>
  );
};
