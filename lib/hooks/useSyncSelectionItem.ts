import { useEffect } from "react";
import { IdType, useSelection } from "@/components/common/SelectionContext";

export const useSyncSelectionItem = <T extends IdType, ItemType>(
  id: T,
  item: ItemType,
) => {
  const { updateItem } = useSelection<T, ItemType>();

  useEffect(() => {
    updateItem(id, item);
  }, [id, item, updateItem]);
};
