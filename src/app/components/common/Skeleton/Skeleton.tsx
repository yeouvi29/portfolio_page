import clsx from "clsx";

const Skeleton = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number | string;
  height?: number | string;
}) => {
  const style = { width, height };
  return (
    <div
      className={clsx(
        `rounded-full animate-pulse overflow-hidden ${className}`
      )}
      style={style}
    >
      <div className="bg-slate-200 w-full h-full"></div>
    </div>
  );
};
export default Skeleton;
