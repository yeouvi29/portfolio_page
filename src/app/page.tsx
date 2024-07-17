import Link from "next/link";

const Home = async () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href={"/portfolio"}>portfolio</Link>
    </div>
  );
};

export default Home;
