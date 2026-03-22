"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  // wait for transition to finish
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

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
