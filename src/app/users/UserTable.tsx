"use client";

import { HiDotsVertical } from "react-icons/hi";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import SortPopOver from "@/components/ui/SortPopOver/SortPopOver";
import Skeleton from "@/components/common/Skeleton/Skeleton";
import { avatars } from "@/components/assets/avatars/avatars";
import { UserEntity } from "@/db/types";

import { ListControlStateType } from "./page";

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
    item: ListControlStateType["sort"]["item"];
    order: ListControlStateType["sort"]["order"];
  }) => void;
  sortingItem: ListControlStateType["sort"];
}) => {
  return (
    <div className="mt-4 overflow-x-scroll rounded-lg">
      <table className="bg-white">
        <thead className="bg-gray-200">
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
                            item: title as ListControlStateType["sort"]["item"],
                            order:
                              order as ListControlStateType["sort"]["order"],
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
          {loading ? (
            new Array(20).fill("").map((_, i) => (
              <tr
                className="h-[50px] text-sm border-b-2 border-b-gray-200 text-gray-800"
                key={i}
              >
                <td className="w-[80px]">
                  <Skeleton className="mx-4" width={30} height={30} />
                </td>
                <td className="w-[140px]">
                  <Skeleton className="mx-4" width={100} height={9} />
                </td>

                <td className="w-[260px] min-w[260px] ">
                  <Skeleton className="mx-4" width={150} height={9} />
                </td>
                <td className="w-[200px] min-w-[200px]">
                  <Skeleton className="mx-4" width={130} height={9} />
                </td>
                <td className="w-[140px]">
                  <Skeleton className="mx-4" width={100} height={9} />
                </td>
                <td className="w-[140px]">
                  <Skeleton className="mx-4" width={100} height={9} />
                </td>
                <td className="w-[140px]">
                  <Skeleton className="mx-4" width={100} height={9} />
                </td>
                <td className="w-[160px]">
                  <Skeleton className="mx-4" width={100} height={9} />
                </td>
                <td className="w-[160px]">
                  <Skeleton className="mx-4" width={100} height={9} />
                </td>
              </tr>
            ))
          ) : data ? (
            data.length ? (
              data.map((user) => {
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
                    <td className="w-[260px] min-w-[260px] max-w-[260px] px-4">
                      {user.email}
                    </td>
                    <td className="w-[200px] min-w-[200px]  max-w-[200px] px-4">
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
                    <td className="w-[160px] min-w-[160px] px-4">
                      {user.lastLogin}
                    </td>
                    <td className="w-[160px] min-w-[160px] px-4">
                      {user.registeredDate}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="h-[50px] text-sm border-b-2 border-b-gray-100 last-of-type:border-none text-gray-800">
                <td colSpan={HEADER.length} className="text-center">
                  No user found.
                </td>
              </tr>
            )
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
