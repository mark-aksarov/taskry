"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeleteCompaniesContext =
  createContext<DeleteEntitiesContextType | null>(null);

interface DeleteCompaniesProviderProps {
  children: React.ReactNode;
}

export function DeleteCompaniesProvider({
  children,
}: DeleteCompaniesProviderProps) {
  // store IDs to track companies being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    deleteCompanies,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
  );

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteCompaniesContext.Provider value={contextValue}>
      {children}
    </DeleteCompaniesContext.Provider>
  );
}

export function useDeleteCompanies() {
  const context = useContext(DeleteCompaniesContext);
  if (!context)
    throw new Error(
      "useDeleteCompanies must be used within a DeleteCompaniesContext.Provider",
    );
  return context;
}
