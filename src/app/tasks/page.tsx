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
        <div className="p-4 text-center md:text-right">
          <p>
            😎 This page was created with reference to Trello's drag & drop
            functionality.{" "}
          </p>
          <p>
            You can move, edit, add, and delete tasks and lists through
            drag-and-drop actions or via popup windows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
