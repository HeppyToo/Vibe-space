import React from 'react';

import {Container} from "@/app/(browse)/_components/container";
import {Sidebar} from "@/app/(browse)/_components/sidebar";
interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const BrowseLayout: React.FC<ProtectedLayoutProps> = ({children}) => {
    return (
        <>
            <div className="md:flex h-full">
                <Sidebar />

                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default BrowseLayout;