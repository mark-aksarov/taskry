import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type UserItem = {
  id: string;
  fullName: string;
};

export const useUserSelection = () => useSelection<string, UserItem>();

export const useSyncSelectionUserItem = (id: string, fullName: string) => {
  const item = useMemo(() => ({ id, fullName }), [id, fullName]);
  useSyncSelectionItem<string, UserItem>(id, item);
};
