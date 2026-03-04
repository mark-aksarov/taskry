"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useRefreshTaskDetailOnActionSuccess } from "@/lib/hooks/useRefreshTaskDetailOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const CreateSubtaskContext = createContext<CreateEntityContextType | null>(
  null,
);

interface CreateSubtaskProviderProps {
  taskId: number;
  createSubtask: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateSubtaskProvider({
  taskId,
  createSubtask,
  children,
}: CreateSubtaskProviderProps) {
  const contextValue = useCreateEntityContextValue(createSubtask);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshTaskDetailOnActionSuccess(state, taskId);

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}

export function useCreateSubtask() {
  const context = useContext(CreateSubtaskContext);
  if (!context)
    throw new Error(
      "useCreateSubtask must be used within CreateSubtaskProvider",
    );
  return context;
}
