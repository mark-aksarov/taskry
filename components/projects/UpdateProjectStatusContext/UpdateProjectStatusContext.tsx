"use client";

import {
  UpdateStatusProviderProps,
  BaseUpdateStatusContextType,
  useBaseUpdateStatusContextState,
} from "@/components/common/BaseUpdateStatusContext";

import { createContext, useContext } from "react";
import { UpdateProjectStatusesPayload } from "@/lib/actions/types";

const UpdateProjectStatusContext =
  createContext<BaseUpdateStatusContextType<UpdateProjectStatusesPayload> | null>(
    null,
  );

export function UpdateProjectStatusProvider({
  updateStatus,
  children,
}: UpdateStatusProviderProps<UpdateProjectStatusesPayload>) {
  const value = useBaseUpdateStatusContextState(updateStatus);

  return (
    <UpdateProjectStatusContext.Provider value={value}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}

export function useUpdateProjectStatusContext() {
  const context = useContext(UpdateProjectStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatusContext must be used within a UpdateProjectStatusProvider",
    );
  }
  return context;
}
