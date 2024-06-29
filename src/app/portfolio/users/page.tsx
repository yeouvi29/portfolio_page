"use client";
import { useQuery } from "@apollo/client";
import UserTable from "./UserTable";
import { usersQuery } from "@/lib/graphql/queries";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import { useEffect, useState } from "react";
const LIMIT = 20;
const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, error, data } = useQuery(usersQuery, {
    variables: { limit: LIMIT, offset: LIMIT * (currentPage - 1) },
  });
  useEffect(() => {
    if (totalPages) {
      return;
    }
    if (data && data.users) {
      setTotalPages(Math.ceil(data.users.totalUsers / LIMIT));
    }
  }, [data]);
  return (
    <div className="flex-grow">
      <h1>users</h1>
      <div>
        <UserTable loading={loading} data={data} />
        {totalPages && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onClickPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
export default Page;
