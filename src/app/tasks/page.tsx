import Title from "./Title";
import BoardSection from "./BoardSection";

const Page = () => {
  return (
    <div data-font-fixed="true" className="mt-5 w-full overflow-x-auto">
      <Title />
      <BoardSection />
      <p className="text-left md:text-right">This page is in progress.</p>
      <p className="text-left md:text-right">
        More functionalities will be added soon.
      </p>
    </div>
  );
};

export default Page;
