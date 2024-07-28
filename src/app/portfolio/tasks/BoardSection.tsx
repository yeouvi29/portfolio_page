"use client";

import { useState } from "react";
import TasksColumn from "./TasksColumn";
import styles from "./styles.module.css";
import clsx from "clsx";
const BoardSection = () => {
  const [taskItems, setTaskItems] = useState([
    {
      title: "To do",
      items: [
        {
          id: Math.random(),
          text: "aasdfoiejw.afjd.lfa as.dlifjdsfldsjfldsfj dss ",
        },
        { id: Math.random(), text: "b" },
        { id: Math.random(), text: "c" },
      ],
    },
    {
      title: "In Progress",
      items: [
        { id: Math.random(), text: "aa" },
        { id: Math.random(), text: "bb" },
        { id: Math.random(), text: "cc" },
      ],
    },
    {
      title: "Done",
      items: [
        { id: Math.random(), text: "aaa" },
        { id: Math.random(), text: "bbb" },
      ],
    },
  ]);
  const [dragItem, setDragItem] = useState<any>(null);

  const handleDrop = () => {
    setDragItem(null);
  };
  return (
    <ol className={clsx("flex gap-3 list-none")}>
      {taskItems.map((item) => (
        <TasksColumn
          onDrop={handleDrop}
          onDragStart={(item) => setDragItem(item)}
          key={item.title}
          dragItem={dragItem}
          title={item.title}
          tasks={item.items}
        />
      ))}
    </ol>
  );
};
export default BoardSection;
