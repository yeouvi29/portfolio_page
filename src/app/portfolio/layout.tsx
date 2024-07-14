import { ReactNode } from "react";
import SideNavigation from "../components/sections/SideNavigation/SideNavigation";
import { ApolloWrapper } from "../ApolloWrapper";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-row">
      <SideNavigation />
      <ApolloWrapper>
        <div className="w-full md:w-[calc(100%-250px)] p-5">{children}</div>
      </ApolloWrapper>
    </div>
  );
};
export default Layout;
