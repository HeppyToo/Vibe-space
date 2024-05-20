import { multiFormatDateString } from '@/lib/utils';

import { currentUser } from "@/lib/auth";
import { Link } from "lucide-react";

type PostCardProps = {
    post: {
        $id: string;
        $createdAt: string;
        location: string;
        caption: string;
        tags: string[];
        imageUrl: string;
        creator: {
            $id: string;
            name: string;
            imageUrl: string;
        };
    };
};

const PostCard = async ({ post }: PostCardProps) => {
    const user = await currentUser()

    if (!post.creator) return;

    return (
        <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={
                                post.creator?.imageUrl ||
                                '/assets/icons/profile-placeholder.svg'
                            }
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">
                            {post.creator.name}
                        </p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular">
                                {multiFormatDateString(post.$createdAt)}
                            </p>
                            -
                            <p className="subtle-semibold lg:small-regular">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>

                <Link
                    to={`/update-post/${post.$id}`}
                    className={`${user?.id !== post.creator.$id && 'hidden'}`}
                >
                    <img
                        src={'/assets/icons/edit.svg'}
                        alt="edit"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>

            <Link to={`/posts/${post.$id}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.map((tag: string, index: number) => (
                            <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img
                    src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="post image"
                    className="post-card_img"
                />
            </Link>
        </div>
    );
};

export default PostCard;