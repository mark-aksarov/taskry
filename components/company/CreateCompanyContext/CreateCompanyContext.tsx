"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const CreateCompanyContext = createContext<CreateEntityContextType | null>(
  null,
);

interface CreateCompanyProviderProps {
  createCompany: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateCompanyProvider({
  createCompany,
  children,
}: CreateCompanyProviderProps) {
  const contextValue = useCreateEntityContextValue(createCompany);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
