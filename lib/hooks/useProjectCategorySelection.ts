import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type ProjectCategoryItem = {
  id: number;
  name: string;
};

export const useProjectCategorySelection = () =>
  useSelection<number, ProjectCategoryItem>();

export const useSyncSelectionProjectCategoryItem = (
  id: number,
  name: string,
) => {
  const item = useMemo(() => ({ id, name }), [id, name]);
  useSyncSelectionItem<number, ProjectCategoryItem>(id, item);
};
