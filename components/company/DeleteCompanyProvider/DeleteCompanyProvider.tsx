"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteCompanyContext } from "../DeleteCompanyContext";
import { deleteCompany } from "@/lib/actions/company/deleteCompany";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

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
