import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import { PostCard } from "@/components/browse/post-card";
import {getPostsAndAuthor} from "@/data/post";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = async () => {
  const posts = await getPostsAndAuthor();

  if(!posts) {
      return
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
            className={cn(
                "text-6xl font-semibold text-white drop-shadow-md",
                font.className,
            )}
        ></h1>
        <ul className="flex flex-col flex-1 gap-9 w-full ">
          {posts.map((post: any) => (
              <li key={post.id} className="flex justify-center w-full">
                <PostCard post={post}/>
              </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
