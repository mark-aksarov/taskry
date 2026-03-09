"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

const UpdateTaskCategoryContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateTaskCategoryProviderProps {
  updateTaskCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateTaskCategoryProvider({
  updateTaskCategory,
  children,
}: UpdateTaskCategoryProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateTaskCategory);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "taskCategoryNotFound" });
  }

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

  return (
    <UpdateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryContext.Provider>
  );
}

export function useUpdateTaskCategory() {
  const context = useContext(UpdateTaskCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategory must be used within a UpdateTaskCategoryProvider",
    );
  }
  return context;
}
