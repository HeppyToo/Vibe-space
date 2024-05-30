import { getUserByUsername } from "@/data/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { currentUser } from "@/lib/auth";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsPostcardHeart } from "react-icons/bs";
import { GridPostList } from "@/components/browse/grid-post-list";
import {getPosts, getPostsByUserId} from "@/data/post";

interface UserPageProps {
  params: {
    username: string;
  };
}

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-primary-500">
      {value}
    </p>
    <p className="text-[14px] font-medium leading-[140%] lg:text-[16px] text-light-2">
      {label}
    </p>
  </div>
);

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  const posts = await getPosts();
  const loggedInUser = await currentUser();

  console.log(posts)

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

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={20} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
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
              <Button type="button" className="px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-center xl:text-left mt-0 max-w-5xl">
        {user?.bio}
      </p>

      {loggedInUser?.id === user?.id && (
        <div className="flex max-w-5xl w-full">
          <GridPostList posts={posts} />
        </div>
      )}
    </div>
  );
};

export default UserPage;
