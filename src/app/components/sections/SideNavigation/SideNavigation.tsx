import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

const SIDE_MENU = [
  { name: "Dashboard", icon: <FaChartSimple />, path: "/" },
  { name: "Users", icon: <FaUser />, path: "/users" },
];
const SideNavigation = () => {
  return (
    <div className="hidden sm:block h-full">
      <nav>
        <ul className="list-none">
          {SIDE_MENU.map((item) => (
            <li key={item.name} className="mt-1 first-of-type:mt-0">
              <Link href={item.path} className="flex flex-row gap-4">
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
