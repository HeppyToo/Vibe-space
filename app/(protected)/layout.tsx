import { Navbar } from "@/app/(protected)/_components/navbar";

import React from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col gap-y-10 items-center justify-center">
      <Navbar />
      <div className="pb-5">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
