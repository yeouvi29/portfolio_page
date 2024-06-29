"use client";

import { UsersQuery } from "@/generated/graphql";

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
const UserTable = ({
  loading,
  data,
}: {
  loading: boolean;
  data?: UsersQuery;
}) => {
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
          {loading
            ? new Array(20).fill("").map((_, i) => (
                <tr className="h-[50px]" key={i}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            : data && data.users
            ? data.users.users.map((user) => (
                <tr className="h-[50px]" key={user.userName}>
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
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
