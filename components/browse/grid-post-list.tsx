import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import {UserRole} from "@prisma/client";

interface Author {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  bio: string | null;
  password: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isTwoFactorEnabled: boolean;
}

interface Post {
  id: string;
  content: string;
  location: string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}

interface GridPostListProps {
  posts: Post[];
  showUser?: boolean;
  showStats?: boolean;
}

export const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
      {posts.map((post) => (
        <li key={post.id} className="ralative min-w-80 h-80">
          <Link
            href={`/post/${post.id}`}
            className="flex rounded-[24px] border border-slate-800/40 overflow-hidden cursor-pointer w-full h-full"
          >
            <Image
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
              height={20}
              width={20}
            />
          </Link>

          {/*<div className="absolute bottom-0 p-5 flex justify-between w-full bg-red-700 from-dark-3 to-transparent rounded-b-[24px] gap-2">*/}
          {/*  {showUser && (*/}
          {/*    <div className="flex items-center justify-start gap-2 flex-1">*/}
          {/*      <Link href={`/profile/${post.authorId}`}>*/}
          {/*        <Avatar className="w-6 h-6">*/}
          {/*          <AvatarImage*/}
          {/*            src={post.authorId || ""}*/}
          {/*            alt="User"*/}
          {/*            className="outline-0"*/}
          {/*          />*/}
          {/*          <AvatarFallback className="bg-black outline-0">*/}
          {/*            <FaUser className="text-white w-6 h-6" />*/}
          {/*          </AvatarFallback>*/}
          {/*        </Avatar>*/}
          {/*        <p className="line-clamp-1">{post.authorId}</p>*/}
          {/*      </Link>*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</div>*/}
        </li>
      ))}
    </ul>
  );
};
