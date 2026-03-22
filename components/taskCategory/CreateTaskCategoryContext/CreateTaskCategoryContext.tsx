"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

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
