"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const CreateTaskCategoryContext = createContext<CreateEntityContextType | null>(
  null,
);

interface CreateTaskCategoryProviderProps {
  createTaskCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateTaskCategoryProvider({
  createTaskCategory,
  children,
}: CreateTaskCategoryProviderProps) {
  const contextValue = useCreateEntityContextValue(createTaskCategory);

  const { isModalOpen, onModalOpenChange, state } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
