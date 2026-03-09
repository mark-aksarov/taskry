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

const UpdateProjectCategoryContext =
  createContext<UpdateEntityContextType | null>(null);

interface UpdateProjectCategoryProviderProps {
  updateProjectCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateProjectCategoryProvider({
  updateProjectCategory,
  children,
}: UpdateProjectCategoryProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateProjectCategory);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "projectCategoryNotFound" });
  }

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

  return (
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}

export function useUpdateProjectCategory() {
  const context = useContext(UpdateProjectCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategory must be used within a UpdateProjectCategoryProvider",
    );
  }
  return context;
}
