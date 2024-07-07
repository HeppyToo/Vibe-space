import { User } from "@prisma/client";
import UserBox from "./user-box";

interface UserListProps {
    items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
    return (
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-[310px] lg:block overflow-y-auto border-r border-slate-600/40 w-full left-0">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-white py-4">
                        People
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox key={item.id} user={item} />
                ))}
            </div>
        </aside>
    );
};

export default UserList;
