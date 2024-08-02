import { ReactNode } from "react";
import clsx from "clsx";

import { lato } from "@/styles/fonts";

import SideNavigation from "./components/sections/SideNavigation/SideNavigation";
import { ApolloWrapper } from "./ApolloWrapper";

import "./globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={clsx(lato.className, "bg-white")}>
        <div className="min-h-screen flex flex-col md:flex-row">
          <SideNavigation />
          <ApolloWrapper>
            <div className="w-full md:w-[calc(100%-250px)] p-5">{children}</div>
          </ApolloWrapper>
        </div>
        <div id="side-root" />
        <div id="modal-root" />
      </body>
    </html>
  );
};
export default Layout;
