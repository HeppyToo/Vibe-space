import { getAllUsers } from "@/data/users";
import UserList from "./_components/user-list";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getAllUsers();

  return (
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
  );
}
