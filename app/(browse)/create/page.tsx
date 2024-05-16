import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { PostForm } from "@/components/browse/post-form";
import {useIsClient} from "usehooks-ts";
import {PostCreationHeader} from "@/app/(browse)/create/_componetn/post-creation-header";
import {Wrapper} from "@/app/(browse)/create/_componetn/wrapper";

const CreatePost = () => {
  return (
    <Wrapper>
        <PostCreationHeader />

        <PostForm action="Create" />
    </Wrapper>
  );
};

export default CreatePost;
