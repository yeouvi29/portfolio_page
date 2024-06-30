import { connectToDatabase } from "@/lib/mongodb";

connectToDatabase();

const Page = () => {
  return (
    <div>
      <h1>Portfolio</h1>
      <p>
        This portfolio page serves as a comprehensive and dynamic interface
        designed to showcase the skills while offering seamless navigation to
        various essential sections. It is built with a modern tech stack,
        emphasizing responsiveness, user experience, and functionality.
      </p>
    </div>
  );
};
export default Page;
