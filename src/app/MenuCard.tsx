import Link from "next/link";
import { Fragment, ReactNode } from "react";

const MenuCard = ({
  icon,
  path,
  title,
  detail,
  techStacks,
  note,
}: {
  icon: ReactNode;
  path: string;
  title: string;
  detail: ReactNode;
  techStacks?: string[];
  note?: string;
}) => {
  return (
    <div className="w-full py-4 flex flex-col gap-4 text-center items-center md:flex-row md:text-left md:items-start">
      <div className="md:min-w-10 md:h-10 rounded-lg p-1 overflow-hidden hover:bg-gray-300">
        <Link className="text-[48px] md:text-[32px] text-gray-400" href={path}>
          {icon}
        </Link>
      </div>
      <div>
        <h2 className="text-2xl">{title}</h2>
        <p>{detail}</p>
        {techStacks && (
          <Fragment>
            <h3 className="text-xl mt-2">Tech Stacks & APIs</h3>
            <div className="flex flex-col md:flex-row gap-2">
              {techStacks.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </Fragment>
        )}
        {note && <p className="text-gray-400">{note}</p>}
      </div>
    </div>
  );
};
export default MenuCard;
