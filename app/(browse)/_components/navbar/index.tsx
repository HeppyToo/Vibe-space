import {Logo} from "@/app/(browse)/_components/navbar/logo";

export const Navbar = () => {
    return (
        <div className="fixed top-0 w-full h-20 z-[49] bg-black px-2 lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
        </div>
    )
};