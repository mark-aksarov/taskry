"use client";

import {
  UpdateStatusProviderProps,
  BaseUpdateStatusContextType,
  useBaseUpdateStatusContextState,
} from "@/components/common/BaseUpdateStatusContext";

import { createContext, useContext } from "react";
import { UpdateTaskStatusesPayload } from "@/lib/actions/types";

const UpdateTaskStatusContext =
  createContext<BaseUpdateStatusContextType<UpdateTaskStatusesPayload> | null>(
    null,
  );

export function UpdateTaskStatusProvider({
  updateStatus,
  children,
}: UpdateStatusProviderProps<UpdateTaskStatusesPayload>) {
  const value = useBaseUpdateStatusContextState(updateStatus);

  return (
    <UpdateTaskStatusContext.Provider value={value}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}

export function useUpdateTaskStatusContext() {
  const context = useContext(UpdateTaskStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusContext must be used within a UpdateTaskStatusProvider",
    );
  }
  return context;
}
