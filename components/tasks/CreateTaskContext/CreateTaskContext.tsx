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
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
