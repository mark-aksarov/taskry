"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreateCompanyContext = createContext<CreateEntityContextType | null>(
  null,
);

export function CreateCompanyProvider({
  createCompany,
  children,
}: {
  createCompany: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createCompany);

  return (
    <CreateCompanyContext.Provider value={contextValue}>
      {children}
    </CreateCompanyContext.Provider>
  );
}

export function useCreateCompany() {
  const context = useContext(CreateCompanyContext);
  if (!context)
    throw new Error(
      "useCreateCompany must be used within CreateCompanyProvider",
    );
  return context;
}
