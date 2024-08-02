import clsx from "clsx";

import { montserrat } from "@/styles/fonts";

import styles from "./styles.module.css";

const Page = () => {
  return (
    <div className="w-full max-w-screen-xl mt-5 flex gap-5 justify-between">
      <div className="text-center lg:text-left">
        <h1 className={clsx(montserrat.className, "mb-5 text-blue-700")}>
          Emily's Portfolio
        </h1>
        <h2 className="text-2xl text-blue-500 mb-3">
          Take a look at my latest work
          <br /> where each page showcases different features designed
          <br /> to address specific user needs.
        </h2>
        <p className="text-gray-500">
          This dynamic interface highlights my skills while offering seamless
          navigation to essential sections.
        </p>
        <p className="text-gray-500">
          Built with Next.js, TailwindCSS, MongoDB, and GraphQL, it highlights
          responsiveness, user experience, and functionality.
        </p>
      </div>
      <div className="hidden lg:block">
        <div
          className={clsx(
            "w-[30px] h-[30px] md:h-[250px] md:w-[250px]",
            styles.heroIcon
          )}
        ></div>
      </div>
    </div>
  );
};
export default Page;
