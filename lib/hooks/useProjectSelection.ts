import {
  SelectionContext,
  SelectionContextType,
} from "@/components/common/SelectionContext";

import { useContext } from "react";

export const useProjectSelection = () => {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error(
      "useProjectSelection must be used within SelectionProvider",
    );
  return context as SelectionContextType<number>;
};
