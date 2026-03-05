"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useRefreshProjectsOnActionSuccess } from "@/lib/hooks/useRefreshProjectsOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const CreateProjectContext = createContext<CreateEntityContextType | null>(
  null,
);

interface CreateProjectProviderProps {
  createProject: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateProjectProvider({
  createProject,
  children,
}: CreateProjectProviderProps) {
  const contextValue = useCreateEntityContextValue(createProject);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshProjectsOnActionSuccess(state);

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
}

export function useCreateProject() {
  const context = useContext(CreateProjectContext);
  if (!context)
    throw new Error(
      "useCreateProject must be used within CreateProjectProvider",
    );
  return context;
}
