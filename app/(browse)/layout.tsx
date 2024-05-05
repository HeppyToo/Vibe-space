import {Container} from "@/app/(browse)/_components/container";
import {Sidebar} from "@/app/(browse)/_components/sidebar";
import {Navbar} from "@/app/(browse)/_components/navbar";
interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const BrowseLayout: React.FC<ProtectedLayoutProps> = ({children}) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default BrowseLayout;