import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type ProjectItem = {
  id: number;
  title: string;
};

export const useProjectSelection = () => useSelection<number, ProjectItem>();

export const useSyncSelectionProjectItem = (id: number, title: string) => {
  const item = useMemo(() => ({ id, title }), [id, title]);
  useSyncSelectionItem<number, ProjectItem>(id, item);
};
