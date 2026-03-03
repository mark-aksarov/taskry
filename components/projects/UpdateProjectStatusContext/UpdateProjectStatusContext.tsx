"use client";

import {
  useUpdateEntityStatusState,
  UpdateEntityStatusContextType,
} from "@/lib/hooks/useUpdateEntityStatusState";

import {
  ActionFn,
  ActionState,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useContext, createContext } from "react";

const UpdateProjectStatusContext =
  createContext<UpdateEntityStatusContextType | null>(null);

interface UpdateProjectStatusProviderProps {
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusesPayload>;
  children: React.ReactNode;
}

export function UpdateProjectStatusProvider({
  updateProjectStatus,
  children,
}: UpdateProjectStatusProviderProps) {
  const contextValue = useUpdateEntityStatusState(updateProjectStatus);

  return (
    <UpdateProjectStatusContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}

export function useUpdateProjectStatus() {
  const context = useContext(UpdateProjectStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatus must be used within a UpdateProjectStatusProvider",
    );
  }
  return context;
}
