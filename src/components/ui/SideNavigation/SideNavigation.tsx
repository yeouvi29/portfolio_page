"use client";

import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

import { FaUser, FaMastodon } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const SideNavigationSlide = dynamic(
  () => import("./../../common/SideNavigationSlide/SideNavigationSlide"),
  {
    ssr: false,
  }
);

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
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState("/");
  const [showSideBar, setShowSideBar] = useState(true);
  const closeSideBar = () => {
    setShowSideBar(false);
  };
  const handleMenuClickOnMobileView = (path: string) => {
    setShowSideBar(false);
    setSelectedPath(path);
  };

  const goToPath = (path: string) => {
    setShowSideBar(false);
    router.push(path);
  };

  useEffect(() => {
    if (!path || !SIDE_MENU.some((item) => item.path === path)) {
      setSelectedPath("/");
      return;
    }
    setSelectedPath(path);
  }, [path]);

  return (
    <Fragment>
      <div
        className="hidden md:block w-[250px] py-4"
        onDragOver={(e) => e.preventDefault()}
      >
        <nav
          className="px-4 sticky top-4"
          onDragOver={(e) => e.preventDefault()}
        >
          <ul className="list-none">
            {SIDE_MENU.map((item) => (
              <li
                key={item.name}
                className={clsx(
                  "mt-1 first-of-type:mt-0 py-2 px-4 rounded-md text-gray-500 hover:bg-gray-200",
                  selectedPath === item.path &&
                    "bg-blue-300 bg-opacity-30 hover:!bg-blue-300 hover:!bg-opacity-50 !text-blue-600"
                )}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => setSelectedPath(item.path)}
              >
                <Link
                  href={item.path}
                  className="flex flex-row items-center gap-4"
                  onDragOver={(e) => e.preventDefault()}
                >
                  <span onDragOver={(e) => e.preventDefault()}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="w-screen p-2 md:hidden">
        <button
          className="bg-white/60 w-9 h-9 p-2 md:hidden text-xl cursor-pointer text-gray-600 rounded-full hover:bg-gray-200"
          onClick={() => {
            setShowSideBar((prev) => !prev);
          }}
        >
          <FiMenu />
        </button>
      </div>
      <SideNavigationSlide show={showSideBar} onClose={closeSideBar}>
        <Fragment>
          <div className="p-4" onClick={() => goToPath("/")}>
            <Image
              src="/assets/logo_icon.svg"
              width={25}
              height={25}
              alt="Tokozzing Logo"
            />
          </div>
          <nav className="px-4 top-4" onDragOver={(e) => e.preventDefault()}>
            <ul className="list-none">
              {SIDE_MENU.map((item) => (
                <li
                  key={item.name}
                  className={clsx(
                    "mt-1 first-of-type:mt-0 py-2 px-4 rounded-md text-gray-500 hover:bg-gray-200",
                    selectedPath === item.path &&
                      "bg-blue-300 bg-opacity-30 hover:!bg-blue-300 hover:!bg-opacity-50 !text-blue-600"
                  )}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => handleMenuClickOnMobileView(item.path)}
                >
                  <Link
                    href={item.path}
                    className="flex flex-row items-center gap-4"
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <span onDragOver={(e) => e.preventDefault()}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Fragment>
      </SideNavigationSlide>
    </Fragment>
  );
};

export default SideNavigation;
