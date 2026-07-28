"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateClientFullNameContext =
  createContext<ActionContextType | null>(null);

interface UpdateClientFullNameProviderProps {
  children: React.ReactNode;
}

export function UpdateClientFullNameProvider({
  children,
}: UpdateClientFullNameProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientFullName");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientFullName");

  return (
    <UpdateClientFullNameContext.Provider value={contextValue}>
      {children}
    </UpdateClientFullNameContext.Provider>
  );
}

export function useUpdateClientFullName() {
  const context = useContext(UpdateClientFullNameContext);
  if (!context) {
    throw new Error(
      "useUpdateClientFullName must be used within a UpdateClientFullNameContext.Provider",
    );
  }
  return context;
}
