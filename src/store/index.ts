import { TaskItem, TaskItems } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface DragItem {
  columnId: string;
  item: { task: TaskItem; hight: number };
}

interface DragItemState {
  item: DragItem | null;
  setDragItem: (item: DragItem | null) => void;
}
export interface DragEnterItem {
  columnId: string;
  index: number;
}
interface DragEnterItemState {
  item: DragEnterItem | null;
  setDragEnterItem: (item: DragEnterItem | null) => void;
}

interface TaskItemsState {
  items: TaskItems[];
  setTaskItems: (taskItems: TaskItems[]) => void;
}

export const useDragItem = create<DragItemState>((set) => ({
  item: null,
  setDragItem: (item) => set({ item }),
}));

export const useDragEnterItem = create<DragEnterItemState>((set) => ({
  item: null,
  setDragEnterItem: (item) => set({ item }),
}));

export const useTaskItems = create<TaskItemsState>((set) => ({
  items: [
    {
      title: "To do",
      id: uuidv4(),
      items: [
        {
          id: uuidv4(),
          text: "aasdfoiejw.afjd.lfa as.dlifjdsfldsjfldsfj dss ",
        },
        { id: uuidv4(), text: "b" },
        { id: uuidv4(), text: "c" },
      ],
    },
    {
      title: "In Progress",
      id: uuidv4(),
      items: [
        { id: uuidv4(), text: "aa" },
        { id: uuidv4(), text: "bb" },
        { id: uuidv4(), text: "cc" },
      ],
    },
    {
      title: "Done",
      id: uuidv4(),
      items: [
        { id: uuidv4(), text: "aaa" },
        { id: uuidv4(), text: "bbb" },
      ],
    },
  ],
  setTaskItems: (items) => set({ items }),
}));
