"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateClientCompanyContext =
  createContext<ActionContextType | null>(null);

interface UpdateClientCompanyProviderProps {
  children: React.ReactNode;
}

export function UpdateClientCompanyProvider({
  children,
}: UpdateClientCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientCompany");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientCompany");

  return (
    <UpdateClientCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateClientCompanyContext.Provider>
  );
}

export function useUpdateClientCompany() {
  const context = useContext(UpdateClientCompanyContext);
  if (!context) {
    throw new Error(
      "useUpdateClientCompany must be used within a UpdateClientCompanyContext.Provider",
    );
  }
  return context;
}
