"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const UpdateProjectCategoryContext =
  createContext<UpdateEntityContextType | null>(null);

interface UpdateProjectCategoryProviderProps {
  updateProjectCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateProjectCategoryProvider({
  updateProjectCategory,
  children,
}: UpdateProjectCategoryProviderProps) {
  const contextValue = useUpdateEntityState(updateProjectCategory);

  return (
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}

export function useUpdateProjectCategory() {
  const context = useContext(UpdateProjectCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategory must be used within a UpdateProjectCategoryProvider",
    );
  }
  return context;
}
