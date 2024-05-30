import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { PostCard } from "@/components/browse/post-card";
import { getPosts } from "@/data/post";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = async () => {
  const posts = await getPosts();

  if (!posts) {
    return;
  }

  return (
      <main className="flex h-full text-white">
        <div className="flex flex-col space-y-6 text-center flex-grow">
          <ul
            className={cn(
              "text-xl font-semibold text-white drop-shadow-md mt-3",
              font.className,
            )}
          >
            Тут будуть сторіси
          </ul>
          <ul className="flex flex-col flex-1 gap-9 w-full pb-5">
            {posts.map((post: any) => (
              <li key={post.id} className="flex justify-center w-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/4 mt-3">Юзери</div>
      </main>
  );
};

export default Home;
