import { create } from "zustand";

import { DragEnterItem, DragStartItem, TaskItems } from "@/types";
import { DEFAULT_TASKS } from "@/mockData";

interface IsCursorOnTopState {
  isCursorOnTop: boolean;
  setIsCursorOnTop: (isCursorOnTop: boolean) => void;
}

export const useIsCursorOnTop = create<IsCursorOnTopState>((set) => ({
  isCursorOnTop: false,
  setIsCursorOnTop: (currentState: boolean) => {
    console.log("set", currentState);
    return set({ isCursorOnTop: currentState });
  },
}));

interface TaskItemsState {
  items: TaskItems[];
  drag: {
    start: DragStartItem | null;
    enter: DragEnterItem | null;
  };
  setTaskItems: (taskItems: TaskItems[]) => void;
  setDragEnter: (item: DragEnterItem) => void;
  setDragStart: (item: DragStartItem) => void;
  resetDrag: () => void;
  setAll: (items: {
    items?: TaskItems[];
    drag: {
      start: DragStartItem | null;
      enter: DragEnterItem | null;
    };
  }) => void;
}

export const useTaskItems = create<TaskItemsState>((set) => ({
  items: DEFAULT_TASKS,
  drag: {
    start: null,
    enter: null,
  },
  setTaskItems: (items) => set((prev) => ({ ...prev, items })),
  setDragEnter: (item) =>
    set((prev) => ({ ...prev, drag: { ...prev.drag, enter: item } })),
  setDragStart: (item) =>
    set((prev) => ({ ...prev, drag: { ...prev.drag, start: item } })),
  resetDrag: () =>
    set((prev) => ({ ...prev, drag: { start: null, enter: null } })),
  setAll: (newState) => set((prev) => ({ ...prev, ...newState })),
}));
