"use client";

import Title from "./Title";
import BoardSection from "./BoardSection";
import { useDropTask } from "@/hooks/useDropTask";

const Page = () => {
  const { handleDrop } = useDropTask();

  return (
    <div
      className="w-full overflow-x-auto"
      onDrag={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
    >
      <Title />
      <BoardSection />
    </div>
  );
};

export default Page;
