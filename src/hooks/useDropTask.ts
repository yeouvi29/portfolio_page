import { useDragEnterItem, useDragItem, useTaskItems } from "@/store";

export const useDropTask = () => {
  const [dragItem, setDragItem] = useDragItem(({ item, setDragItem }) => [
    item,
    setDragItem,
  ]);
  const [dragEnterItem, setDragEnterItem] = useDragEnterItem(
    ({ item, setDragEnterItem }) => [item, setDragEnterItem]
  );
  const [taskItems, setTaskItems] = useTaskItems(({ items, setTaskItems }) => [
    items,
    setTaskItems,
  ]);

  const handleDrop = () => {
    if (!dragItem || !dragEnterItem || !taskItems.length) return;

    const dragColumnIndex = taskItems.findIndex(
      (column) => column.id === dragItem.columnId
    );
    const dropColumnIndex = taskItems.findIndex(
      (column) => column.id === dragEnterItem.columnId
    );
    const newTaskItems = [...taskItems];
    const dragItemIndex = newTaskItems[dragColumnIndex].items.findIndex(
      (item) => item.id === dragItem?.item.task.id
    );
    const dropItemIndex = dragEnterItem.index;

    const isTheSameItem =
      dragColumnIndex === dropColumnIndex && dragItemIndex === dropItemIndex;

    if (isTheSameItem) {
      setDragItem(null);
      setDragEnterItem(null);
      return;
    }

    newTaskItems[dropColumnIndex].items.splice(
      dropItemIndex,
      0,
      dragItem.item.task
    );
    if (dragEnterItem.columnId === dragItem.columnId) {
      if (dragItemIndex < dropItemIndex) {
        newTaskItems[dragColumnIndex].items.splice(dragItemIndex, 1);
      } else {
        newTaskItems[dragColumnIndex].items.splice(dragItemIndex + 1, 1);
      }
    } else {
      newTaskItems[dragColumnIndex].items = newTaskItems[
        dragColumnIndex
      ].items.filter((item) => item.id !== dragItem.item.task.id);
    }

    setTaskItems(newTaskItems);
    setDragItem(null);
    setDragEnterItem(null);
  };
  return { handleDrop };
};
