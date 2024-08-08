import Title from "./Title";
import BoardSection from "./BoardSection";

const Page = () => {
  return (
    <div
      data-font-fixed="true"
      data-no-x-scroll="true"
      className="absolute pl-[250px] w-screen min-h-screen overflow-auto bg-orange-400/80"
    >
      <div className="mt-5">
        <Title />
        <BoardSection />
        <p className="text-left md:text-right">This page is in progress.</p>
        <p className="text-left md:text-right">
          More functionalities will be added soon.
        </p>
      </div>
    </div>
  );
};

export default Page;
