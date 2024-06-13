"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { currentUser } from "@/lib/auth";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { GridPostList } from "@/components/browse/grid-post-list";
import { getPostsByUserId } from "@/data/post";
import { getUserByUserId } from "@/data/user";
import { getFollowers, getFollowing, isFollowingUser } from "@/action/follow";
import FollowButton from "@/app/(browse)/profile/_component/follow-button";
import BlockButton from "@/app/(browse)/profile/_component/block-button";
import { isBlockedByUser } from "@/action/block";
import { notFound } from "next/navigation";
import { ModalFollowers } from "@/app/(browse)/profile/_component/modal-followers";

interface UserPageProps {
  params: {
    userId: string;
  };
}

interface StabBlockProps {
  value: string | number | undefined;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex justify-center items-center gap-2 flex-row">
    <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-primary-500">
      {value}
    </p>
    <p className="text-[14px] font-medium leading-[140%] lg:text-[16px] text-light-2">
      {label}
    </p>
  </div>
);

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserId(params.userId);

  if (!user) {
    notFound();
  }

  const posts = await getPostsByUserId(user.id);
  const loggedInUser = await currentUser();

  const followStatus = await isFollowingUser(user.id);

  const followers = await getFollowers(user.id);
  const following = await getFollowing(user.id);

  const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar text-white">
      <div className="flex items-center xl:items-start gap-8 flex-col xl:flex-row relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <div className="flex justify-center items-center">
            <Avatar className="w-36 h-36">
              <AvatarImage
                src={user?.image || ""}
                alt="User"
                className="outline-0"
              />
              <AvatarFallback className="bg-black outline-0 flex justify-center items-center">
                <FaUser className="text-white w-32 h-32" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left text-[24px] font-bold leading-[140%] tracking-tighter md:text-[36px] w-full">
                {user?.name}
              </h1>
              <p className=" text-[14px] font-normal leading-[140%] md:text-[18px] md:font-medium text-light-3 text-center xl:text-left">
                {user?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-1 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={posts?.length} label="Posts" />
              <ModalFollowers authors={followers} label="Followers">
                <StatBlock value={followers.length} label="Followers" />
              </ModalFollowers>
              <ModalFollowers authors={following} label="Following">
                <StatBlock value={following.length} label="Following" />
              </ModalFollowers>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className={`${user?.id !== loggedInUser?.id && "hidden"}`}>
              <Link
                href={`/update-profile/${loggedInUser?.id}`}
                className={`h-12 bg-[#1f1f1f] px-5 flex justify-center items-center gap-2 rounded-lg ${
                  user?.id !== loggedInUser?.id && "hidden"
                }`}
              >
                <FaRegEdit className="h-6 w-6" />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>

            <div
              className={`${
                user?.id === loggedInUser?.id && "hidden"
              } flex flex-col gap-2 pt-1`}
            >
              <FollowButton userId={user.id} isFollowing={followStatus} />
              <BlockButton userId={user.id} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl flex justify-start">
        <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-center xl:text-left mt-0">
          {user?.bio}
        </p>
      </div>
      <div className="flex max-w-5xl w-full">
        <GridPostList posts={posts} showUser={false} />
      </div>
    </div>
  );
};

export default UserPage;
