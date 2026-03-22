"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

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
