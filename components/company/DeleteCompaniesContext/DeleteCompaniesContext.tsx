"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
  useState,
} from "react";

interface DeleteCompaniesContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  companyIds: number[];
  setCompanyIds: (companyIds: number[]) => void;
}

const DeleteCompaniesContext = createContext<DeleteCompaniesContextType | null>(
  null,
);

interface DeleteCompaniesProviderProps {
  children: React.ReactNode;
}

export function DeleteCompaniesProvider({
  children,
}: DeleteCompaniesProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [companyIds, setCompanyIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      companyIds,
      setCompanyIds,
    }),
    [isPending, companyIds],
  );

  return (
    <DeleteCompaniesContext.Provider value={contextValue}>
      {children}
    </DeleteCompaniesContext.Provider>
  );
}

export function useDeleteCompanies() {
  const context = useContext(DeleteCompaniesContext);
  if (!context) {
    throw new Error(
      "useDeleteCompanies must be used within a DeleteCompaniesProvider",
    );
  }
  return context;
}
