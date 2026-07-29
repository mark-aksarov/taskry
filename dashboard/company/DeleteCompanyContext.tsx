"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { deleteCompany } from "@/lib/actions/company/deleteCompany";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeleteCompanyContext = createContext<ActionContextType<number> | null>(
  null,
);

interface DeleteCompanyProviderProps {
  children: React.ReactNode;
}

export function DeleteCompanyProvider({
  children,
}: DeleteCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteCompany, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteCompanyContext.Provider value={contextValue}>
      {children}
    </DeleteCompanyContext.Provider>
  );
}

export function useDeleteCompany() {
  const context = useContext(DeleteCompanyContext);
  if (!context)
    throw new Error(
      "useDeleteCompany must be used within DeleteCompanyContext.Provider",
    );
  return context;
}
