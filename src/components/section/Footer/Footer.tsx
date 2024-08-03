import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full h-[120px] flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 ">
        <p className="text-xs font-normal">
          © 2024 Emily Kang. All Rights Reserved.
        </p>
        <Link href={"/"} className="al">
          <span className="sr-only">Emily&apos;s Blog - Portfolio</span>
          <Image
            width={32}
            height={32}
            priority
            src="/assets/logo_icon.svg"
            alt="TokozZing Logo"
          />
        </Link>
      </div>
    </div>
  );
};
export default Footer;
