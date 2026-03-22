"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useContext, createContext, useEffect } from "react";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
  const refreshTaskDetail = useRefreshTaskDetail(taskId);
  const contextValue = useCreateEntityContextValue(createSubtask);
  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish
  useEffect(() => {
    refreshTaskDetail();
  }, [state, refreshTaskDetail]);

  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

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
