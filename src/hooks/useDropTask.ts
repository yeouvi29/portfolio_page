import { useIsCursorOnTop, useTaskItems } from "@/store";
import { removeElements } from "../../utils";

export const useDropTask = () => {
  const [taskItems, dragItem, dragEnterItem, setAll] = useTaskItems(
    ({ items, drag, setAll }) => [items, drag.start, drag.enter, setAll]
  );

  const [isCursorOnTop] = useIsCursorOnTop(({ isCursorOnTop }) => [
    isCursorOnTop,
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
      setAll({ drag: { start: null, enter: null } });
      return;
    }

    newTaskItems[dropColumnIndex].items.splice(
      dropItemIndex +
        (!newTaskItems[dropColumnIndex].items.length || isCursorOnTop ? 0 : 1),
      0,
      dragItem.item.task
    );
    if (dragEnterItem.columnId === dragItem.columnId) {
      if (dragItemIndex < dropItemIndex) {
        newTaskItems[dragColumnIndex].items.splice(
          dragItemIndex + (isCursorOnTop ? 1 : 0),
          1
        );
      } else {
        newTaskItems[dragColumnIndex].items.splice(
          dragItemIndex + (isCursorOnTop ? 1 : 2),
          1
        );
      }
    } else {
      newTaskItems[dragColumnIndex].items = newTaskItems[
        dragColumnIndex
      ].items.filter((item) => item.id !== dragItem.item.task.id);
    }

    setAll({ drag: { start: null, enter: null }, items: newTaskItems });

    removeElements("drag-image");
  };
  return { handleDrop };
};
