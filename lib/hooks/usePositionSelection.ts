import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type PositionItem = {
  id: number;
  name: string;
};

export const usePositionSelection = () => useSelection<number, PositionItem>();

export const useSyncSelectionPositionItem = (id: number, name: string) => {
  const item = useMemo(() => ({ id, name }), [id, name]);
  useSyncSelectionItem<number, PositionItem>(id, item);
};
