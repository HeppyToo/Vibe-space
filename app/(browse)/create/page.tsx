import { PostForm } from "@/components/browse/post-form";
import { PostCreationHeader } from "@/app/(browse)/create/_componetn/post-creation-header";

const CreatePost = () => {
  return (
      <div className="text-white min-h-screen w-full flex flex-1 flex-col gap-10 pt-10 px-5 md:px-8 lg:p-9 custom-scrollbar">
        <PostCreationHeader />

        <PostForm action="Create" />
      </div>
  );
};

export default CreatePost;
