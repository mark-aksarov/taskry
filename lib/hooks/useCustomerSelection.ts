import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type CustomerItem = {
  id: number;
  fullName: string;
};

export const useCustomerSelection = () => useSelection<number, CustomerItem>();

export const useSyncSelectionCustomerItem = (id: number, fullName: string) => {
  const item = useMemo(() => ({ id, fullName }), [id, fullName]);
  useSyncSelectionItem<number, CustomerItem>(id, item);
};
