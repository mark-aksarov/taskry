import {
  SelectionContext,
  SelectionContextType,
} from "@/components/common/SelectionContext";

import { useContext } from "react";

export const useTaskSelection = () => {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error("useTaskSelection must be used within SelectionProvider");
  return context as SelectionContextType<number>;
};
