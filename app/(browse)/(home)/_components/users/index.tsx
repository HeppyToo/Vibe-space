import {SessionUser} from "@/app/(browse)/(home)/_components/users/sessionUser";
import {RecommendedUsers} from "@/app/(browse)/(home)/_components/users/recomended";

export const Users = () => {

    return (
            <aside className="pt-10">
                <SessionUser />
                <p className="pt-5 text-gray-500 text-sm">Suggested for you</p>
                <RecommendedUsers />
                <p className="pt-5 text-gray-500 text-[12px]">© 2024 VIBE SPACE FROM META</p>
            </aside>
    );
};
