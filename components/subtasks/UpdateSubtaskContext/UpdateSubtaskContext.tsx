"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { createContext, useContext, useEffect } from "react";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

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
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useUpdateEntityContextValue(updateSubtask);
  const { state, isModalOpen, onModalOpenChange } = contextValue;

  useCloseModalOnActionSuccess(state, onModalOpenChange);

  useEffect(() => {
    refreshTaskDetail();
  }, [state, refreshTaskDetail]);

  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
