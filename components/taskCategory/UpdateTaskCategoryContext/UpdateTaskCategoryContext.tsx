"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const UpdateTaskCategoryContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateTaskCategoryProviderProps {
  updateTaskCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateTaskCategoryProvider({
  updateTaskCategory,
  children,
}: UpdateTaskCategoryProviderProps) {
  const contextValue = useUpdateEntityState(updateTaskCategory);

  return (
    <UpdateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryContext.Provider>
  );
}

export function useUpdateTaskCategory() {
  const context = useContext(UpdateTaskCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategory must be used within a UpdateTaskCategoryProvider",
    );
  }
  return context;
}
