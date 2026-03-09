"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

const UpdateTaskContext = createContext<UpdateEntityContextType | null>(null);

interface UpdateTaskProviderProps {
  updateTask: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateTaskProvider({
  updateTask,
  children,
}: UpdateTaskProviderProps) {
  const pathname = usePathname();

  const contextValue = useUpdateEntityContextValue(updateTask);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/tasks") {
      throw new Error(state.message, { cause: "taskNotFound" });
    }

    notFound();
  }

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
