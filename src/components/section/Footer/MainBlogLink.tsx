import Link from "next/link";
import clsx from "clsx";

import styles from "./style.module.css";

const MainBlogLink = () => {
  return (
    <div className="group absolute right-0 bottom-5 p-2 text-md text-gray-600 rounded-lg hover:bg-blue-500 hover:cursor-pointer">
      <Link
        className={clsx(styles.blogLink)}
        href="https://tokozzing.com"
        target="_blank"
      >
        Go to Emily&apos;s Blog
      </Link>
    </div>
  );
};

export default MainBlogLink;
