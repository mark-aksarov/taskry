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

const CreateTaskContext = createContext<CreateEntityContextType | null>(null);

interface CreateTaskProviderProps {
  createTask: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateTaskProvider({
  createTask,
  children,
}: CreateTaskProviderProps) {
  const contextValue = useCreateEntityContextValue(createTask);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  return (
    <CreateTaskContext.Provider value={contextValue}>
      {children}
    </CreateTaskContext.Provider>
  );
}

export function useCreateTask() {
  const context = useContext(CreateTaskContext);
  if (!context)
    throw new Error("useCreateTask must be used within CreateTaskProvider");
  return context;
}
