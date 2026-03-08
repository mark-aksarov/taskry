"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

const CreateProjectCategoryContext =
  createContext<CreateEntityContextType | null>(null);

interface CreateProjectCategoryProviderProps {
  createProjectCategory: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateProjectCategoryProvider({
  createProjectCategory,
  children,
}: CreateProjectCategoryProviderProps) {
  const contextValue = useCreateEntityContextValue(createProjectCategory);

  const { isModalOpen, onModalOpenChange, state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

  return (
    <CreateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </CreateProjectCategoryContext.Provider>
  );
}

export function useCreateProjectCategory() {
  const context = useContext(CreateProjectCategoryContext);
  if (!context)
    throw new Error(
      "useCreateProjectCategory must be used within CreateProjectCategoryProvider",
    );
  return context;
}
