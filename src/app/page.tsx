import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { usersQuery } from "@/lib/graphql/queries";
import Link from "next/link";

const Home = async () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href={"/portfolio"}>portfolio</Link>
    </div>
  );
};

export default Home;
