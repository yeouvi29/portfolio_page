"use client";

import { useId } from "react";
import { UsersQuery } from "@/generated/graphql";

const HEADER = [
  "Name",
  "Email",
  "ID",
  `Membership`,
  "Subscription Plan",
  "Payment Status",
  "Last Login",
  "Registered Date",
];

const Shimmer = ({ w, h }: { w: number; h: number }) => {
  const id = useId();
  return (
    <div className="w-fit rounded-full overflow-hidden">
      <svg
        width={w}
        height={h}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient id={"g" + id}>
            <stop stop-color="#D1D5DB" offset="20%" />
            <stop stop-color="#B7BCC5" offset="50%" />
            <stop stop-color="#D1D5DB" offset="70%" />
          </linearGradient>
        </defs>
        <rect width={w} height={h} fill="#D1D5DB" />
        <rect id={"r" + id} width={w} height={h} fill={`url(#${"g" + id})`} />
        <animate
          xlinkHref={`#${"r" + id}`}
          attributeName="x"
          from={`-${w}`}
          to={w}
          dur="1s"
          repeatCount="indefinite"
        />
      </svg>
    </div>
  );
};

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
                <tr
                  className="h-[50px] text-sm border-b-2 border-b-gray-200 text-gray-800"
                  key={i}
                >
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="min-w-[260px]">
                    <Shimmer w={150} h={9} />
                  </td>
                  <td className="min-w-[200px]">
                    <Shimmer w={130} h={9} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                </tr>
              ))
            : data && data.users
            ? data.users.users.map((user) => (
                <tr
                  className="h-[50px] text-sm border-b-2 border-b-gray-200 text-gray-800"
                  key={user.userName}
                >
                  <td className="w-[140px] px-4">{user.name}</td>
                  <td className="min-w-[260px] px-4">{user.email}</td>
                  <td className="min-w-[200px] px-4">{user.userName}</td>
                  <td className="min-w-[140px] px-4">
                    {user.membershipStatus}
                  </td>
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
