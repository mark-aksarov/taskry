"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

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
  const contextValue = useUpdateEntityState(updateProject);

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
