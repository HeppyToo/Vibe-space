import { getAllUsers } from "@/data/users";

import {SearchCardComponent} from "@/app/(browse)/search/_component/search-card-component";

const SearchPage = async () => {
  const users = await getAllUsers();

  if(!users) { return (<div> No users found </div>)}

  return (
    <div className="text-white h-screen flex flex-col flex-1 items-center py-10 px-5 md:p-14 custom-scrollbar w-full">
      <SearchCardComponent users={users}/>
    </div>
  );
};

export default SearchPage;
