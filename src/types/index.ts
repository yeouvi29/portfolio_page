export interface TaskItem {
  id: string;
  text: string;
}
export interface TaskItems {
  title: string;
  id: string;
  items: TaskItem[];
}

export interface DragStartItem {
  columnId: string;
  item?: TaskItem;
  height: number;
}

export interface DragEnterItem {
  columnId: string;
  position: "top" | "bottom" | "left" | "right";
  index?: number;
}
