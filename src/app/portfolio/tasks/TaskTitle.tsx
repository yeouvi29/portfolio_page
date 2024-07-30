"use client";

const TaskTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-[272px] p-2">
      <p>{title}</p>
    </div>
  );
};
export default TaskTitle;
