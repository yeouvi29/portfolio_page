import Link from "next/link";

import Logo from "@/components/assets/avatars/Logo";

const Footer = () => {
  return (
    <div className="absolute left-0 bottom-0 w-full h-[120px] flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 text-gray-600">
        <p className="text-xs font-normal">
          © 2024 Emily Kang. All Rights Reserved.
        </p>
        <Link href={"/"}>
          <span className="sr-only">Emily&apos;s Blog - Portfolio</span>
          <Logo className="text-[32px] text-gray-600" />
        </Link>
      </div>
    </div>
  );
};
export default Footer;
