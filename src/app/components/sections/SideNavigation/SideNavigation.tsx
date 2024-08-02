"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaUser, FaMastodon } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
const SIDE_MENU = [
  {
    name: "Home",
    icon: <AiFillHome />,
    path: "/",
  },
  {
    name: "SF Dashboard",
    icon: <MdSpaceDashboard />,
    path: "/dashboard",
  },
  { name: "Users", icon: <FaUser />, path: "/users" },
  { name: "Task Management", icon: <FaMastodon />, path: "/tasks" },
];
const SideNavigation = () => {
  const path = usePathname();

  return (
    <div
      className="hidden md:block w-[250px] py-4"
      onDragOver={(e) => e.preventDefault()}
    >
      <nav className="px-4 sticky top-4" onDragOver={(e) => e.preventDefault()}>
        <ul className="list-none">
          {SIDE_MENU.map((item) => (
            <li
              key={item.name}
              className={clsx(
                "mt-1 first-of-type:mt-0 py-2 px-4 rounded-md text-gray-500 hover:bg-gray-200",
                path === item.path &&
                  "bg-blue-300 bg-opacity-30 hover:!bg-blue-300 hover:!bg-opacity-50 !text-blue-600"
              )}
              onDragOver={(e) => e.preventDefault()}
            >
              <Link
                href={item.path}
                className="flex flex-row items-center gap-4"
                onDragOver={(e) => e.preventDefault()}
              >
                <span onDragOver={(e) => e.preventDefault()}>{item.icon}</span>
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
