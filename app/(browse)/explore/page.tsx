import {getPosts} from "@/data/post";
import {PostCardComponent} from "@/app/(browse)/explore/_components/post-card-component";

const ExplorePage = async () => {
    const posts = await getPosts();

    if(!posts) { return (<div> No posts found </div>)}

    return (
        <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar h-screen">
            <PostCardComponent posts={posts}/>
        </div>
    );
};

export default ExplorePage;