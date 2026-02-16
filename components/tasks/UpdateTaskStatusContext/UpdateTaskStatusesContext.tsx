"use client";

import {
  UpdateStatusProviderProps,
  BaseUpdateStatusContextType,
  useBaseUpdateStatusContextState,
} from "@/components/common/BaseUpdateStatusContext";

import { createContext, useContext } from "react";
import { UpdateTaskStatusesPayload } from "@/lib/actions/types";

const UpdateTaskStatusesContext =
  createContext<BaseUpdateStatusContextType<UpdateTaskStatusesPayload> | null>(
    null,
  );

export function UpdateTaskStatusesProvider({
  updateStatus,
  children,
}: UpdateStatusProviderProps<UpdateTaskStatusesPayload>) {
  const value = useBaseUpdateStatusContextState(updateStatus);

  return (
    <UpdateTaskStatusesContext.Provider value={value}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}

export function useUpdateTaskStatusesContext() {
  const context = useContext(UpdateTaskStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusesContext must be used within a UpdateTaskStatusesProvider",
    );
  }
  return context;
}
