import { Container } from "@/app/components/common/Container/Container";
import Title from "./Title";
import BoardSection from "./BoardSection";

const Page = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Title />
      <BoardSection />
    </div>
  );
};

export default Page;
