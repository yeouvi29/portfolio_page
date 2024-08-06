import Link from "next/link";
import clsx from "clsx";

import styles from "./style.module.css";

const MainBlogLink = () => {
  return (
    <div
      className={clsx(
        styles.blogLinkWrapper,
        "absolute right-1/2 bottom-2 translate-x-1/2 p-3 text-md text-gray-600 rounded-lg hover:cursor-pointer md:right-0 md:bottom-5 md:translate-x-0"
      )}
    >
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
