"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useSWRConfig } from "swr";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useContext, createContext, useEffect } from "react";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const UpdateTaskContext = createContext<UpdateEntityContextType | null>(null);

interface UpdateTaskProviderProps {
  taskId: number;
  updateTask: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateTaskProvider({
  taskId,
  updateTask,
  children,
}: UpdateTaskProviderProps) {
  const { mutate } = useSWRConfig();
  const contextValue = useUpdateEntityContextValue(updateTask);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

  // refetch task form data after successful update
  useEffect(() => {
    if (state.status === "success") {
      mutate(`/api/tasks/${taskId}?view=edit`);
    }
  }, [taskId, mutate]);

  return (
    <UpdateTaskContext.Provider value={contextValue}>
      {children}
    </UpdateTaskContext.Provider>
  );
}

export function useUpdateTask() {
  const context = useContext(UpdateTaskContext);
  if (!context) {
    throw new Error("useUpdateTask must be used within a UpdateTaskProvider");
  }
  return context;
}
