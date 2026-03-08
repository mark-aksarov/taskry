"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

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

  // wait for transition to finish
  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
