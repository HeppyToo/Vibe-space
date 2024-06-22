import UserList from "@/app/(browse)/messages/user-list";
import {getAllUsers} from "@/data/users";

const MessagesPage = async () => {
  const users = await getAllUsers()

  return <div className="flex justify-between h-screen"><UserList items={users}/><div className="flex flex-1 justify-center"><p>Chat</p></div></div>;
};

export default MessagesPage;
