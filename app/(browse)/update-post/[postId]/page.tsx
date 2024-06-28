import {getPostById} from "@/data/post";
import { CiEdit } from "react-icons/ci";
import {PostForm} from "@/components/browse/post-form";
import {notFound} from "next/navigation";

interface PostPageProps {
    params: {
        postId: string;
    };
}

const EditPost = async ({params} : PostPageProps) => {
    const post = await getPostById(params.postId);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex flex-1 justify-center overflow-hidden">
            <div className="flex flex-col flex-1 items-center gap-4 py-5 px-5 md:px-8 lg:p-10 custom-scrollbar max-w-5xl">
                <div className="flex gap-x-2 justify-start w-full max-w-5xl">
                    <CiEdit className="w-10 h-10"/>
                    <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">Edit Post</h2>
                </div>

                <PostForm action="Update" post={post} />
            </div>
        </div>
    );
};

export default EditPost;