"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  useActionState,
} from "react";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

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
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
