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
  const contextValue = useUpdateEntityContextValue(updateTaskCategory);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
