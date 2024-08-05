import Title from "./Title";
import BoardSection from "./BoardSection";

const Page = () => {
  return (
    <div data-fixed="true" className="mt-5 w-full overflow-x-auto">
      <Title />
      <BoardSection />
    </div>
  );
};

export default Page;
