"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreateTaskCategoryContext = createContext<CreateEntityContextType | null>(
  null,
);

export function CreateTaskCategoryProvider({
  createTaskCategory,
  children,
}: {
  createTaskCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createTaskCategory);

  return (
    <CreateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </CreateTaskCategoryContext.Provider>
  );
}

export function useCreateTaskCategory() {
  const context = useContext(CreateTaskCategoryContext);
  if (!context)
    throw new Error(
      "useCreateTaskCategory must be used within CreateTaskCategoryProvider",
    );
  return context;
}
