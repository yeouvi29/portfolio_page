import { useTaskItems } from "@/store";
import { TaskItems } from "@/types";

import { removeElements } from "../../utils";

export const useDropTask = () => {
  const [taskItems, dragItem, dragEnterItem, setAll] = useTaskItems(
    ({ items, drag, setAll }) => [items, drag.start, drag.enter, setAll]
  );

  const handleListDrop = (shouldAddBefore: boolean) => {
    if (!dragItem || !dragEnterItem) return;
    const indexOfColumn = taskItems.findIndex(
      (column) => column.id === dragItem.columnId
    );
    const indexOfDroppedColumn = taskItems.findIndex(
      (column) => column.id === dragEnterItem?.columnId
    );

    if (indexOfDroppedColumn === indexOfColumn) {
      return;
    }

    const newTaskItems = taskItems.reduce((newTaskItems, column, i) => {
      if (column.id === dragItem.columnId) {
        return newTaskItems;
      }
      if (i === indexOfDroppedColumn) {
        if (shouldAddBefore) {
          newTaskItems = [...newTaskItems, taskItems[indexOfColumn], column];
        } else {
          newTaskItems = [...newTaskItems, column, taskItems[indexOfColumn]];
        }
      } else {
        newTaskItems = [...newTaskItems, column];
      }
      return newTaskItems;
    }, [] as TaskItems[]);
    setAll({ drag: { start: null, enter: null }, items: newTaskItems });
  };

  const handleItemDrop = (shouldAddBefore: boolean) => {
    if (!dragItem || !dragEnterItem) return;
    const { item: currentDragItem } = dragItem;
    if (!currentDragItem) return;
    const dragColumnIndex = taskItems.findIndex(
      (column) => column.id === dragItem.columnId
    );
    const dropColumnIndex = taskItems.findIndex(
      (column) => column.id === dragEnterItem.columnId
    );
    const newTaskItems = taskItems.map((item) => ({
      ...item,
      items: item.items.map((item) => ({ ...item })),
    }));

    const dragItemIndex = newTaskItems[dragColumnIndex].items.findIndex(
      (item) => item.id === currentDragItem.id
    );
    const dropItemIndex = dragEnterItem.index || 0;

    const isTheSameItem =
      dragColumnIndex === dropColumnIndex && dragItemIndex === dropItemIndex;

    if (isTheSameItem) {
      setAll({ drag: { start: null, enter: null } });
      return;
    }

    newTaskItems[dropColumnIndex].items.splice(
      dropItemIndex +
        (!newTaskItems[dropColumnIndex].items.length || shouldAddBefore
          ? 0
          : 1),
      0,
      currentDragItem
    );

    if (dragEnterItem.columnId === dragItem.columnId) {
      if (dragItemIndex < dropItemIndex) {
        newTaskItems[dragColumnIndex].items = newTaskItems[
          dragColumnIndex
        ].items.filter((_, index) => index !== dragItemIndex);
      } else {
        newTaskItems[dragColumnIndex].items = newTaskItems[
          dragColumnIndex
        ].items.filter((_, index) => index !== dragItemIndex + 1);
      }
    } else {
      newTaskItems[dragColumnIndex].items = newTaskItems[
        dragColumnIndex
      ].items.filter((item) => item.id !== currentDragItem.id);
    }

    setAll({ drag: { start: null, enter: null }, items: newTaskItems });

    removeElements("#drag-image");
  };

  const handleDrop = (shouldAddBefore: boolean) => {
    if (!dragItem || !dragEnterItem || !taskItems.length) return;
    if (dragItem.item) {
      handleItemDrop(shouldAddBefore);
    } else {
      handleListDrop(shouldAddBefore);
    }
  };
  return { handleDrop };
};
