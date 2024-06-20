"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { multiFormatDateString } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostStats } from "@/components/browse/post-stats";
import {Post} from "@/types";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-[#1f1f1f] rounded-3xl border text-white border-slate-800/40 p-5 lg:p-7 w-full max-w-screen-sm w-f">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.id}`}>
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={post.author.image || ""}
                alt="User"
                className="outline-0"
              />
              <AvatarFallback className="bg-black outline-0">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col">
            <p className="flex justify-start text-[16px] font-medium leading-[140%] lg:text-[18px]">
              {post.author.name}
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {multiFormatDateString(post.createdAt)}.
              </p>
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px]">
                {post.location}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Link href={`/post/${post.id}`}>
        <div className="flex justify-start text-[14px] font-medium leading-[140%] lg:text-[16px] py-5">
          <p>{post.content}</p>
        </div>

        <Image
          src={post.imageUrl}
          alt="post_image"
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
          height={450}
          width={450}
        />
      </Link>

      <div className="flex w-full justify-between">
        <ul className="flex gap-1 mt-2">
          {post.tags.map((tag: string, index: number) => (
            <li
              key={`${tag}${index}`}
              className="text-[14px] font-normal leading-[140%]"
            >
              #{tag}
            </li>
          ))}
        </ul>
        <PostStats postId={post.id} isLiked={post.isLiked} isSaved={post.isSaved} likeCount={post.likeCount}/>
      </div>
    </div>
  );
};
