"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";
import { useRefreshProjectCategoriesOnActionSuccess } from "@/lib/hooks/useRefreshProjectCategoriesOnActionSuccess";

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
  const contextValue = useUpdateEntityContextValue(updateProjectCategory);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshProjectCategoriesOnActionSuccess(state);

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
