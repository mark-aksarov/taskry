"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";
import { useRefreshCompaniesOnActionSuccess } from "@/lib/hooks/useRefreshCompaniesOnActionSuccess";

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
  const contextValue = useUpdateEntityContextValue(updateCompany);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshCompaniesOnActionSuccess(state);

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
