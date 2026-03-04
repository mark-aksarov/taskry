"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const UpdateTaskContext = createContext<UpdateEntityContextType | null>(null);

interface UpdateTaskProviderProps {
  updateTask: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateTaskProvider({
  updateTask,
  children,
}: UpdateTaskProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateTask);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
