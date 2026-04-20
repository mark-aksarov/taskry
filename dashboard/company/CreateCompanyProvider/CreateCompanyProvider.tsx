"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateCompanyContext } from "../CreateCompanyContext";
import { createCompany } from "@/lib/actions/company/createCompany";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateCompanyProviderProps {
  children: React.ReactNode;
}

export function CreateCompanyProvider({
  children,
}: CreateCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createCompany, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createCompany");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createCompany");

  return (
    <CreateCompanyContext.Provider value={contextValue}>
      {children}
    </CreateCompanyContext.Provider>
  );
}
