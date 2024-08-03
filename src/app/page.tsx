import clsx from "clsx";

import { Container } from "@/components/common/Container/Container";

import styles from "./styles.module.css";
import Footer from "@/components/section/Footer/Footer";
import { PAGES, SIDE_MENU } from "@/constants";
import MenuCard from "./MenuCard";

const Page = () => {
  return (
    <Container className="relative !mx-0 !px-0 h-full">
      <div className="w-full max-w-screen-xl mt-5 flex gap-5 justify-between items-end">
        <div className="text-center lg:text-left">
          <h1 className="mb-7 text-blue-700">Emily&apos;s Portfolio</h1>
          <div className="max-w-[600px]">
            <h2 className="text-2xl text-blue-500 mb-3">
              Take a look at my latest work <br />
              <span className="text-[1.25rem] font-medium text-blue-300">
                where each page showcases different features designed to address
                specific user needs.
              </span>
            </h2>
          </div>
          <p className="text-gray-600">
            This dynamic interface highlights my skills while offering seamless
            navigation to essential sections.
          </p>
          <p className="text-gray-600">
            Built with Next.js, TailwindCSS, MongoDB, and GraphQL, it highlights
            responsiveness, user experience, and functionality.
          </p>
        </div>
        <div className="hidden lg:block">
          <div
            className={clsx(
              "w-[30px] h-[30px] md:h-[220px] md:w-[220px]",
              styles.heroIcon
            )}
          ></div>
        </div>
      </div>
      <section className="mt-12 pb-[132px]">
        <div className="flex flex-col gap-4 text-gray-600">
          {PAGES.map((page, i) => (
            <MenuCard
              key={page.title}
              title={page.title}
              icon={SIDE_MENU[i + 1].icon}
              detail={page.explanation}
              techStacks={page.techStacks}
              path={page.path}
              note={page.note}
            />
          ))}
        </div>
      </section>
      <Footer />
    </Container>
  );
};
export default Page;
