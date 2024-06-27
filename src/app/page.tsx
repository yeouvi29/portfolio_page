import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

const Home = async () => {
  const { loading, error, data } = await getClient().query({
    query: HELLO_QUERY,
    context: {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1>{data.hello}</h1>
    </div>
  );
};

export default Home;
