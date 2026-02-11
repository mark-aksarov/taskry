import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type TaskCategoryItem = {
  id: number;
  name: string;
};

export const useTaskCategorySelection = () =>
  useSelection<number, TaskCategoryItem>();

export const useSyncSelectionTaskCategoryItem = (id: number, name: string) => {
  const item = useMemo(() => ({ id, name }), [id, name]);
  useSyncSelectionItem<number, TaskCategoryItem>(id, item);
};
