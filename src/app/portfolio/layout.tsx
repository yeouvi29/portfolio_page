import { ReactNode } from "react";
import SideNavigation from "../components/sections/SideNavigation/SideNavigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
};
export default Layout;
