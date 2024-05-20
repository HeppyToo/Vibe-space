import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import {getPosts} from "@/data/post";
import PostCard from "@/components/browse/post-card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const Home = async () => {
  const user = await currentUser();

  let posts = await getPosts();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        ></h1>
        <p className="text-white text-lg">
          <PostCard post={posts} />
        </p>
      </div>
    </main>
  );
};

export default Home;
