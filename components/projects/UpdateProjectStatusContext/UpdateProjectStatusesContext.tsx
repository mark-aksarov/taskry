"use client";

import {
  UpdateStatusProviderProps,
  BaseUpdateStatusContextType,
  useBaseUpdateStatusContextState,
} from "@/components/common/BaseUpdateStatusContext";

import { createContext, useContext } from "react";
import { UpdateProjectStatusesPayload } from "@/lib/actions/types";

const UpdateProjectStatusesContext =
  createContext<BaseUpdateStatusContextType<UpdateProjectStatusesPayload> | null>(
    null,
  );

export function UpdateProjectStatusesProvider({
  updateStatus,
  children,
}: UpdateStatusProviderProps<UpdateProjectStatusesPayload>) {
  const value = useBaseUpdateStatusContextState(updateStatus);

  return (
    <UpdateProjectStatusesContext.Provider value={value}>
      {children}
    </UpdateProjectStatusesContext.Provider>
  );
}

export function useUpdateProjectStatusesContext() {
  const context = useContext(UpdateProjectStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatusesContext must be used within a UpdateProjectStatusesProvider",
    );
  }
  return context;
}
