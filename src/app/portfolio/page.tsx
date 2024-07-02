import { connectToDatabase } from "@/lib/mongodb";

connectToDatabase();

const Page = () => {
  return (
    <div>
      <h1>Portfolio</h1>
      <p>
        This portfolio page serves as a comprehensive and dynamic interface
        designed to showcase the skills while offering seamless navigation to
        various essential sections. Built with Next.js, TailwindCSS, MongoDB,
        and GraphQL, it highlights responsiveness, user experience, and
        functionality.
      </p>
    </div>
  );
};
export default Page;
