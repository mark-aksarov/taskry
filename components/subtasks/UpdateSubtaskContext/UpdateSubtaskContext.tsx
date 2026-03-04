"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useRefreshTaskDetailOnActionSuccess } from "@/lib/hooks/useRefreshTaskDetailOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const UpdateSubtaskContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateSubtaskProviderProps {
  taskId: number;
  updateSubtask: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateSubtaskProvider({
  taskId,
  updateSubtask,
  children,
}: UpdateSubtaskProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateSubtask);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshTaskDetailOnActionSuccess(contextValue.state, taskId);

  return (
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}

export function useUpdateSubtask() {
  const context = useContext(UpdateSubtaskContext);
  if (!context) {
    throw new Error(
      "useUpdateSubtask must be used within a UpdateSubtaskProvider",
    );
  }
  return context;
}
