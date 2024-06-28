import { ApolloWrapper } from "@/app/ApolloWrapper";
import UserTable from "./UserTable";

const Page = () => {
  return (
    <div className="flex-grow">
      <h1>users</h1>
      <UserTable />
    </div>
  );
};
export default Page;
