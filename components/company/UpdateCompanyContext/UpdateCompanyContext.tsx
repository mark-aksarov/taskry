"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const UpdateCompanyContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdateCompanyProviderProps {
  updateCompany: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateCompanyProvider({
  updateCompany,
  children,
}: UpdateCompanyProviderProps) {
  const contextValue = useUpdateEntityState(updateCompany);

  return (
    <UpdateCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyContext.Provider>
  );
}

export function useUpdateCompany() {
  const context = useContext(UpdateCompanyContext);
  if (!context) {
    throw new Error(
      "useUpdateCompany must be used within a UpdateCompanyProvider",
    );
  }
  return context;
}
