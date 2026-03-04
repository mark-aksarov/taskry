"use client";

import {
  UpdateEntityStatusesContextType,
  useUpdateEntityStatusesContextValue,
} from "@/lib/hooks/useUpdateEntityStatusesContextValue";

import {
  ActionFn,
  ActionState,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useContext, createContext } from "react";

const UpdateProjectStatusesContext =
  createContext<UpdateEntityStatusesContextType | null>(null);

interface UpdateProjectStatusesProviderProps {
  updateProjectStatuses: ActionFn<ActionState, UpdateProjectStatusesPayload>;
  children: React.ReactNode;
}

export function UpdateProjectStatusesProvider({
  updateProjectStatuses,
  children,
}: UpdateProjectStatusesProviderProps) {
  const contextValue = useUpdateEntityStatusesContextValue(
    updateProjectStatuses,
  );

  return (
    <UpdateProjectStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusesContext.Provider>
  );
}

export function useUpdateProjectStatuses() {
  const context = useContext(UpdateProjectStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatuses must be used within a UpdateProjectStatusesProvider",
    );
  }
  return context;
}
