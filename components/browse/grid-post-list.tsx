import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import {Post} from "@/types";

interface GridPostListProps {
  posts: Post[] | null | undefined;
  showUser?: boolean;
  showStats?: boolean;
}

export const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="text-white text-5xl">Post not found</div>
      </div>
    );
  }

  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
      {posts.map((post) => (
        <li key={post.id} className="relative min-w-80 h-80">
          <Link
            href={`/post/${post.id}`}
            className="flex rounded-[24px] border border-slate-800/40 overflow-hidden cursor-pointer w-full h-full"
          >
            <Image
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
              height={321}
              width={318}
            />
          </Link>

          <div className="absolute bottom-0 p-5 flex justify-between w-full bg-transparent rounded-b-[24px] gap-2">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <Link
                  href={`/profile/${post.authorId}`}
                  className="flex justify-center items-center"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={post.author.image || ""}
                      alt="User"
                      className="outline-0"
                    />
                    <AvatarFallback className="bg-black outline-0">
                      <FaUser className="text-white w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="line-clamp-1 pl-2 text-white shadow-xl">
                    {post.author.name}
                  </p>
                </Link>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
