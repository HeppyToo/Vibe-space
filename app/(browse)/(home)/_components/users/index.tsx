import {SessionUser} from "@/app/(browse)/(home)/_components/users/sessionUser";
import {RecommendedUsers} from "@/app/(browse)/(home)/_components/users/recomended";
import Link from "next/link";

export const Users = () => {

    return (
      <aside className="fixed pl-3 lg:pt-10 pr-10">
        <SessionUser />
        <div className="flex justify-between">
          <p className="pt-5 text-gray-500 text-sm">Suggested for you</p>
            <Link href={`/search`} className="pt-5 hover:text-slate-400">
                all
            </Link>
        </div>
        <RecommendedUsers />
        <p className="pt-5 text-gray-500 text-[12px]">
          © 2024 VIBE SPACE FROM META
        </p>
      </aside>
    );
};
