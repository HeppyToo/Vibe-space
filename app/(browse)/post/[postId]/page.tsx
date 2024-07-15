import { currentUser } from "@/lib/auth";
import { getPostById, getPostsByUserId } from "@/data/post";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { PostStats } from "@/components/browse/post-stats";
import { PostDeleteButton } from "@/app/(browse)/post/[postId]/_component/post-delete-button";
import { IoMdArrowBack } from "react-icons/io";
import { multiFormatDateString } from "@/lib/utils";
import { CiEdit } from "react-icons/ci";
import { GridPostList } from "@/components/browse/grid-post-list";
import React from "react";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostDetails: React.FC<PostPageProps> = async ({ params }) => {
  const user = await currentUser();

  const post = await getPostById(params.postId);
  const posts = await getPostsByUserId(post?.authorId || "");

  if (!post) {
    notFound();
  }

  return (
      <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
        <div className="hidden md:flex max-w-5xl w-full">
          <Button
              // onClick={() => navigate(-1)}
              variant="outline"
          >
            <IoMdArrowBack className="w-5 h-5" />
            <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">
              Back
            </p>
          </Button>
        </div>
        <div className="bg-[#1f1f1f] w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-slate-600/40 xl:rounded-l-[24px]">
          <img
              src={post?.imageUrl}
              alt="creator"
              className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-black"
          />

          <div className="bg-[#1f1f1f] flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between w-full">
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
                        {multiFormatDateString(post?.createdAt.toString())}
                      </p>
                      <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px]">
                        {post.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link
                    href={`/update-post/${post.id}`}
                    className={`${
                        user?.id !== post?.author.id ? "hidden" : ""
                    } flex justify-center items-center`}
                >
                  <CiEdit />
                </Link>

                <PostDeleteButton
                    postId={post.id}
                    userId={user?.id}
                    postIdCreator={post.authorId}
                />
              </div>
            </div>

            <hr className="border w-full border-slate-600/40" />

            <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:base-regular">
              <p>{post.content}</p>
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
            </div>

            <div className="w-full">
              <PostStats
                  postId={post.id}
                  isLiked={post.isLiked !== undefined ? post.isLiked : false}
                  isSaved={post.isSaved !== undefined ? post.isSaved : false}
                  likeCount={post.likeCount !== undefined ? post.likeCount : 0}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl">
          <hr className="border w-full border-slate-600/40" />

          <h3 className="text-[18px] font-bold leading-[140%] md:text-[24px] tracking-tighter w-full my-10">
            More Related Posts
          </h3>
          {!posts ? <p>Post not found</p> : <GridPostList posts={posts} />}
        </div>
      </div>
  );
};

export default PostDetails;
