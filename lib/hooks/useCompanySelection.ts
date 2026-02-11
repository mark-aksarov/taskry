import { useMemo } from "react";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type CompanyItem = {
  id: number;
  name: string;
};

export const useCompanySelection = () => useSelection<number, CompanyItem>();

export const useSyncSelectionCompanyItem = (id: number, name: string) => {
  const item = useMemo(() => ({ id, name }), [id, name]);
  useSyncSelectionItem<number, CompanyItem>(id, item);
};
