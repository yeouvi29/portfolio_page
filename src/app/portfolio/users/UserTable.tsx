"use client";

import { useId } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import { avatars } from "@/app/components/assets/avatars/avatars";
import { UserEntity } from "@/db/types";
import { SortingItemType } from "./page";
import SortPopOver from "@/app/components/ui/SortPopOver/SortPopOver";

const HEADER = [
  { name: "Avatar", key: "avatar", sortable: false, width: "80px" },
  { name: "Name", key: "name", sortable: true, width: "140px" },
  { name: "Email", key: "email", sortable: true, width: "260px" },
  { name: "ID", key: "userName", sortable: true, width: "200px" },
  {
    name: "Membership",
    key: "membershipStatus",
    sortable: false,
    width: "140px",
  },
  {
    name: "Subscription Plan",
    key: "subscriptionPlan",
    sortable: false,
    width: "140px",
  },
  {
    name: "Payment Status",
    key: "paymentStatus",
    sortable: false,
    width: "140px",
  },
  { name: "Last Login", key: "lastLogin", sortable: true, width: "140px" },
  {
    name: "Registered Date",
    key: "registeredDate",
    sortable: true,
    width: "140px",
  },
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
  updateSort,
  sortingItem,
}: {
  loading: boolean;
  data?: UserEntity[] | null;
  updateSort: ({
    item,
    order,
  }: {
    item: SortingItemType["item"];
    order: SortingItemType["order"];
  }) => void;
  sortingItem: SortingItemType;
}) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="bg-white">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {HEADER.map(({ key, name, sortable }) => (
              <th
                className="text-sm px-4 py-2 text-left text-gray-600"
                key={key}
              >
                {sortable ? (
                  <div className="w-full flex justify-between items-center gap-4">
                    {sortingItem.item === key ? (
                      <span className="flex gap-2 items-center">
                        {name}
                        {sortingItem.order === "asc" ? (
                          <FaArrowUpLong />
                        ) : (
                          <FaArrowDownLong />
                        )}
                      </span>
                    ) : (
                      <span>{name}</span>
                    )}
                    <span className="p-1 rounded-full cursor-pointer hover:bg-gray-300">
                      <SortPopOver
                        parent={<HiDotsVertical />}
                        title={key}
                        onClickSort={(title, order) =>
                          updateSort({
                            item: title as SortingItemType["item"],
                            order: order as SortingItemType["order"],
                          })
                        }
                      />
                    </span>
                  </div>
                ) : (
                  name
                )}
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

                  <td className="w-[260px] min-w[260px]">
                    <Shimmer w={150} h={9} />
                  </td>
                  <td className="w-[200px] min-w-[200px]">
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
            : data
            ? data.map((user) => {
                const index =
                  Number(user.registeredDate.slice(3, 5)) +
                  Number(user.lastLogin.slice(3, 5));

                return (
                  <tr
                    className="h-[50px] text-sm border-b-2 border-b-gray-100 last-of-type:border-none text-gray-800"
                    key={user.userName}
                  >
                    <td className="w-[80px] max-w-[80px] px-4">
                      {avatars[index % 20]}
                    </td>
                    <td className="w-[140px] min-w-[140px] px-4">
                      {user.name}
                    </td>
                    <td className="w-[260px] min-w-[260px] px-4">
                      {user.email}
                    </td>
                    <td className="w-[200px] min-w-[200px] px-4">
                      {user.userName}
                    </td>
                    <td className="w-[140px] min-w-[140px] px-4">
                      {user.membershipStatus}
                    </td>
                    <td className="w-[140px] min-w-[140px] px-4">
                      {user.subscriptionPlan}
                    </td>
                    <td className="w-[140px] min-w-[140px] px-4">
                      {user.paymentStatus}
                    </td>
                    <td className="w-[140px] min-w-[140px] px-4">
                      {user.lastLogin}
                    </td>
                    <td className="w-[140px] min-w-[140px] px-4">
                      {user.registeredDate}
                    </td>
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
