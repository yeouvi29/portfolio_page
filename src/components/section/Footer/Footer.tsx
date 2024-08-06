"use client";

import Link from "next/link";

import Logo from "@/components/assets/avatars/Logo";

import MainBlogLink from "./MainBlogLink";

const Footer = () => {
  return (
    <div className="absolute left-0 bottom-0 w-full h-[120px] flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 text-gray-600">
        <div>
          <p className="text-xs font-normal">
            © 2024 Emily Kang. All Rights Reserved.
          </p>
        </div>
        <Link href={"/"}>
          <span className="sr-only">Emily Kang - Front-End Developer</span>
          <Logo className="text-[32px] text-gray-600" />
        </Link>
      </div>
      <MainBlogLink />
    </div>
  );
};
export default Footer;
