"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { createCompany } from "@/lib/actions/company/createCompany";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const CreateCompanyContext = createContext<ActionContextType | null>(null);

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

export function useCreateCompany() {
  const context = useContext(CreateCompanyContext);
  if (!context)
    throw new Error(
      "useCreateCompany must be used within CreateCompanyContext.Provider",
    );
  return context;
}
