"use client";

import TaskCard from "./TaskCard";
import clsx from "clsx";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

const TasksColumn = ({
  title,
  tasks,
  onDrop,
  dragItem,
  onDragStart,
}: {
  title: string;
  tasks: any;
  dragItem: any;
  onDrop: (key: any, item: any) => void;
  onDragStart: (item: any) => void;
}) => {
  return (
    <li
      className={clsx(
        "flex flex-col h-fit rounded-lg border-solid border-2 border-gray-200 bg-gray-200"
      )}
    >
      <TaskTitle title={title} dragItem={dragItem} />
      <div>
        <ol className="list-none flex flex-col gap-2">
          {tasks.map((task: any, i: number) => (
            <TaskCard
              dragItem={dragItem}
              key={i}
              task={task}
              title={title}
              onDragStart={onDragStart}
            />
          ))}
        </ol>
      </div>
      <AddTask dragItem={dragItem} />
    </li>
  );
};

export default TasksColumn;
