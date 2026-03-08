"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

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

  // wait for transition to finish
  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
