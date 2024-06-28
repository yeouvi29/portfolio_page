import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { usersQuery } from "@/lib/graphql/queries";
import Link from "next/link";
// const HELLO_QUERY = gql`
//   query Hello {
//     hello
//   }
// `;

const Home = async () => {
  const { loading, error, data } = await getClient().query({
    query: usersQuery,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href={"/portfolio"}>portfolio</Link>
    </div>
  );
};

export default Home;
