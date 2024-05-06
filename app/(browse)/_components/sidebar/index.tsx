import {Wrapper} from "@/app/(browse)/_components/sidebar/wrapper";
import {Links} from "@/app/(browse)/_components/sidebar/links";
import {Logo} from "@/app/(browse)/_components/sidebar/logo";
import {IoIosMenu} from "react-icons/io";
import React from "react";

export const Sidebar = () => {
    return(
        <Wrapper>
            <aside className="flex flex-col justify-between pt-4 lg:pt-0 h-full">
                <div className="ml-8">
                    <Logo/>
                </div>
                <Links/>
                <div className="w-full p-8 flex justify-start gap-x-4 items-center mb-4">
                    <IoIosMenu className="w-6 h-6"/>
                    <p> More </p>
                </div>
            </aside>
        </Wrapper>
    )
}