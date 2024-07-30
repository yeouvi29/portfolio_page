export interface TaskItem {
  id: string;
  text: string;
}
export interface TaskItems {
  title: string;
  id: string;
  items: TaskItem[];
}
