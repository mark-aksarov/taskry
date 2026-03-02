"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreateProjectCategoryContext =
  createContext<CreateEntityContextType | null>(null);

export function CreateProjectCategoryProvider({
  createProjectCategory,
  children,
}: {
  createProjectCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createProjectCategory);

  return (
    <CreateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </CreateProjectCategoryContext.Provider>
  );
}

export function useCreateProjectCategory() {
  const context = useContext(CreateProjectCategoryContext);
  if (!context)
    throw new Error(
      "useCreateProjectCategory must be used within CreateProjectCategoryProvider",
    );
  return context;
}
