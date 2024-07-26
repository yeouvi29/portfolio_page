"use client";

import { useState } from "react";
import TasksColumn from "./TasksColumn";
import styles from "./styles.module.css";
import clsx from "clsx";
const BoardSection = () => {
  const [taskItems, setTaskItems] = useState([
    {
      title: "To do",
      items: ["aasdfoiejw.afjd.lfa as.dlifjdsfldsjfldsfj dss ", "b", "c"],
    },
    { title: "In Progress", items: ["aa", "bb", "cc"] },
    { title: "Done", items: ["aaa", "bbb"] },
  ]);
  const [dragItem, setDragItem] = useState<any>(null);
  const handleDrop = (key: any, item: typeof taskItems) => {
    // setTaskItems
  };
  return (
    <ol className={clsx("flex gap-3 list-none")}>
      {taskItems.map((item) => (
        <TasksColumn
          onDrop={(item) => handleDrop(item.title, item.items)}
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
