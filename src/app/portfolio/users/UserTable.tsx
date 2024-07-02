"use client";

import { useId } from "react";
import { UsersQuery } from "@/generated/graphql";
import { avatars } from "@/app/components/ui/avatars/avatars";
const HEADER = [
  "Avatar",
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
    <div className="w-fit mx-4 rounded-full overflow-hidden">
      <svg
        width={w}
        height={h}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient id={"g" + id}>
            <stop stopColor="#D1D5DB" offset="20%" />
            <stop stopColor="#B7BCC5" offset="50%" />
            <stop stopColor="#D1D5DB" offset="70%" />
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
    <div className="overflow-x-auto rounded-lg">
      <table className="bg-white">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {HEADER.map((header) => (
              <th
                className="text-sm px-4 py-2 text-left text-gray-600"
                key={header}
              >
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
                  <td className="w-[80px]">
                    <Shimmer w={30} h={30} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="w-[140px]">
                    <Shimmer w={100} h={9} />
                  </td>
                  <td className="w-[260px]">
                    <Shimmer w={150} h={9} />
                  </td>
                  <td className="w-[200px]">
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
                </tr>
              ))
            : data && data.users
            ? data.users.users.map((user) => {
                const index =
                  Number(user.registeredDate.slice(0, 2)) +
                  Number(user.lastLogin.slice(0, 2)) -
                  2;

                return (
                  <tr
                    className="h-[50px] text-sm border-b-2 border-b-gray-100 last-of-type:border-none text-gray-800"
                    key={user.userName}
                  >
                    <td className="w-[80px] px-4 text-xs">
                      {avatars[index % 20]}
                    </td>
                    <td className="w-[140px] px-4">{user.name}</td>
                    <td className="w-[260px] px-4">{user.email}</td>
                    <td className="w-[200px] px-4">{user.userName}</td>
                    <td className="w-[140px] px-4">{user.membershipStatus}</td>
                    <td className="w-[140px] px-4">{user.subscriptionPlan}</td>
                    <td className="w-[140px] px-4">{user.paymentStatus}</td>
                    <td className="w-[140px] px-4">{user.lastLogin}</td>
                    <td className="w-[140px] px-4">{user.registeredDate}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
