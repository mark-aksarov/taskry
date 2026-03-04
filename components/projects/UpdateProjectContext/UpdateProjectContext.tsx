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

const UpdateProjectContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateProjectProviderProps {
  updateProject: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateProjectProvider({
  updateProject,
  children,
}: UpdateProjectProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateProject);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

  return (
    <UpdateProjectContext.Provider value={contextValue}>
      {children}
    </UpdateProjectContext.Provider>
  );
}

export function useUpdateProject() {
  const context = useContext(UpdateProjectContext);
  if (!context) {
    throw new Error(
      "useUpdateProject must be used within a UpdateProjectProvider",
    );
  }
  return context;
}
