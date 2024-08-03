import { ReactNode } from "react";
import clsx from "clsx";

import { lato, montserrat } from "@/styles/fonts";

import SideNavigation from "../components/ui/SideNavigation/SideNavigation";
import { ApolloWrapper } from "./ApolloWrapper";

import "./globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={clsx(lato.variable, montserrat.variable)}>
      <body className="bg-white">
        <div className="min-h-screen flex flex-col md:flex-row">
          <SideNavigation />
          <ApolloWrapper>
            <div className="w-full md:w-[calc(100%-250px)] p-5">{children}</div>
          </ApolloWrapper>
        </div>
        <div id="backdrop-root" />
        <div id="side-root" />
        <div id="modal-root" />
      </body>
    </html>
  );
};
export default Layout;
