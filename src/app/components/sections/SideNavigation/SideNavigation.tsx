"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

const SIDE_MENU = [
  { name: "Dashboard", icon: <FaChartSimple />, path: "/portfolio/dashboard" },
  { name: "Users", icon: <FaUser />, path: "/portfolio/users" },
];
const SideNavigation = () => {
  const path = usePathname();

  return (
    <div className="hidden sm:block w-[250px] h-full py-4">
      <nav className="px-4">
        <ul className="list-none">
          {SIDE_MENU.map((item) => (
            <li
              key={item.name}
              className={clsx(
                "mt-1 first-of-type:mt-0 py-2 px-4 rounded-md text-gray-500 hover:bg-gray-200",
                path === item.path &&
                  "bg-blue-300 bg-opacity-30 hover:!bg-blue-300 hover:!bg-opacity-50 !text-blue-600"
              )}
            >
              <Link
                href={item.path}
                className="flex flex-row items-center gap-4"
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
