"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreateProjectContext = createContext<CreateEntityContextType | null>(
  null,
);

export function CreateProjectProvider({
  createProject,
  children,
}: {
  createProject: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createProject);

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
