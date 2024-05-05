import {Wrapper} from "@/app/(browse)/_components/sidebar/wrapper";
import {Content} from "@/app/(browse)/_components/sidebar/content";

export const Sidebar = () => {
    return(
        <Wrapper>
            <div className="space-y-4 pt-4 lg:pt-0">
                <Content />
            </div>
        </Wrapper>
        )
}