import Title from "./Title";
import BoardSection from "./BoardSection";

const Page = () => {
  return (
    <div
      data-font-fixed="true"
      data-no-x-scroll="true"
      className="absolute pt-14 w-screen max-w-screen min-h-screen overflow-hidden bg-orange-400/80 md:pl-[250px] md:pt-0 md:mt-0"
    >
      <div>
        <Title />
        <BoardSection />
        <div className="p-4 text-left md:text-right">
          <p>This page is in progress.</p>
          <p>More functionalities will be added soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
