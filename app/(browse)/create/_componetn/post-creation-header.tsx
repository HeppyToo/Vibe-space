import React from 'react';
import {MdOutlineAddPhotoAlternate} from "react-icons/md";
import {Skeleton} from "@/components/ui/skeleton";

export const PostCreationHeader = () => {
    return (
        <div className="flex items-center gap-3 justify-start lg:justify-center">
            <MdOutlineAddPhotoAlternate className="w-6 h-6"/>
            <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter">
                Create Post
            </h2>
        </div>
    );
};