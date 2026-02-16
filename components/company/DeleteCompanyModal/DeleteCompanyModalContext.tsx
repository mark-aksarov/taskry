"use client";

import {
  useMemo,
  useState,
  Dispatch,
  createContext,
  SetStateAction,
  useContext,
} from "react";

import { ActionFn, ActionState } from "@/lib/actions/types";

import { DeleteCompanyModal } from "./DeleteCompanyModal";

interface DeleteCompanyModalContextType {
  state: CompanyModalState;
  setState: Dispatch<SetStateAction<CompanyModalState>>;
}

const DeleteCompanyModalContext =
  createContext<DeleteCompanyModalContextType | null>(null);

interface CompanyModalState {
  companyId: number;
  companyName: string;
  isOpen: boolean;
}

interface DeleteCompanyModalProviderProps {
  deleteCompanies: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteCompanyModalProvider({
  deleteCompanies,
  children,
}: DeleteCompanyModalProviderProps) {
  const [state, setState] = useState<CompanyModalState>(() => ({
    companyId: 0,
    companyName: "",
    isOpen: false,
  }));

  const contextValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return (
    <DeleteCompanyModalContext.Provider value={contextValue}>
      {children}

      <DeleteCompanyModal
        companyId={state.companyId}
        companyName={state.companyName}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteCompanies={deleteCompanies}
      />
    </DeleteCompanyModalContext.Provider>
  );
}

export function useDeleteCompanyModal() {
  const context = useContext(DeleteCompanyModalContext);

  if (!context) {
    throw new Error(
      "useDeleteCompanyModal must be used within a DeleteCompanyModalProvider",
    );
  }

  return context;
}
