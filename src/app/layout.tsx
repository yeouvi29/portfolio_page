import { Metadata } from "next";
import { ReactNode } from "react";
import clsx from "clsx";

import { lato, montserrat } from "@/styles/fonts";

import SideNavigation from "../components/ui/SideNavigation/SideNavigation";
import { ApolloWrapper } from "./ApolloWrapper";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.tokozzing.com"),
  title: "Emily Kang - Front-End Developer",
  description:
    "Emily Kang is a Front-End Engineer skilled in creating responsive web designs and passionate about building dynamic websites. Explore her portfolio to see her projects and skills in action.",
  creator: "Emily Kang",
  manifest: "/manifest.webmanifest",
  robots: "index, follow",
  alternates: { canonical: "https://portfolio.tokozzing.com" },
  openGraph: {
    type: "website",
    url: "https://portfolio.tokozzing.com",
    locale: "en_US",
    title: "Emily Kang - Front-End Developer",
    description:
      "Emily Kang is a Front-End Engineer skilled in creating responsive web designs and passionate about building dynamic websites. Explore her portfolio to see her projects and skills in action.",
    siteName: "Emily Kang - Front-End Developer",
    images: [{ url: "/api/og" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emily Kang",
    description: "Front-End developer Emily's portfolio",
    creator: "@yeouvi29",
    images: "/api/og",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
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
export default RootLayout;
