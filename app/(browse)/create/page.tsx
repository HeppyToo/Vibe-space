import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {PostForm} from "@/components/browse/post-form";

const CreatePost = () => {
    return (
        <div className="text-white min-h-screen flex flex-1">
            <div className="flex flex-col flex-1 gap-10 py-10 px-5 md:px-8 lg:p-14">
                <div className="flex items-center gap-3 justify-start">
                    <MdOutlineAddPhotoAlternate className="w-6 h-6"/>
                    <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter">
                        Create Post
                    </h2>
                </div>

                <PostForm action="Create"/>
            </div>
        </div>
    );
};

export default CreatePost;