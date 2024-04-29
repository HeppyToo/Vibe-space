import {Navbar} from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({children}) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-black">
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout;