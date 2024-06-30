"use client";

import { UsersQuery } from "@/generated/graphql";

const HEADER = [
  "Name",
  "ID",
  "Email",
  `Membership`,
  "Subscription Plan",
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
              <th className="text-sm px-4 text-left text-gray-600" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? new Array(20).fill("").map((_, i) => (
                <tr className="h-[50px]" key={i}>
                  <td className="w-[140px]"></td>
                  <td className="w-[140px]"></td>
                  <td className="w-[260px]"></td>
                  <td className="w-[200px]"></td>
                  <td className="w-[140px]"></td>
                  <td className="w-[140px]"></td>
                  <td className="w-[140px]"></td>
                  <td className="w-[140px]"></td>
                </tr>
              ))
            : data && data.users
            ? data.users.users.map((user) => (
                <tr
                  className="h-[50px] text-sm border-b-2 border-b-gray-200 text-gray-800"
                  key={user.userName}
                >
                  <td className="w-[140px] px-4">{user.name}</td>
                  <td className="w-[260px] px-4">{user.email}</td>
                  <td className="w-[200px] px-4">{user.userName}</td>
                  <td className="w-[140px] px-4">{user.membershipStatus}</td>
                  <td className="w-[140px] px-4">{user.subscriptionPlan}</td>
                  <td className="w-[140px] px-4">{user.paymentStatus}</td>
                  <td className="w-[140px] px-4">{user.lastLogin}</td>
                  <td className="w-[140px] px-4">{user.registeredDate}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
