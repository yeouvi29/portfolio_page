"use client";
import { DragEvent } from "react";
import TaskCard from "./TaskCard";

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
    <li className="flex">
      <div>
        <p>{title}</p>
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
      </div>
    </li>
  );
};

export default TasksColumn;
