"use client";

import { useQuery } from "@apollo/client";
import { usersQuery } from "@/lib/graphql/queries";

const HEADER = [
  "Name",
  "ID",
  "Email",
  "Membership Status",
  "EmailSubscription Plan",
  "Payment Status",
  "Last Login",
  "Registered Date",
];
const UserTable = () => {
  const { loading, error, data } = useQuery(usersQuery, {
    variables: { limit: 10, offset: 0 },
  });

  if (error) return <p>Something went wrong!</p>;
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {HEADER.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>loading...</td>
            </tr>
          ) : data && data.users ? (
            data.users.users.map((user) => (
              <tr key={user.userName}>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.membershipStatus}</td>
                <td>{user.subscriptionPlan}</td>
                <td>{user.paymentStatus}</td>
                <td>{user.lastLogin}</td>
                <td>{user.registeredDate}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
