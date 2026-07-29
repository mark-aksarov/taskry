"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateClientEmailContext = createContext<ActionContextType | null>(null);

interface UpdateClientEmailProviderProps {
  children: React.ReactNode;
}

export function UpdateClientEmailProvider({
  children,
}: UpdateClientEmailProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientEmail");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientEmail");

  return (
    <UpdateClientEmailContext.Provider value={contextValue}>
      {children}
    </UpdateClientEmailContext.Provider>
  );
}

export function useUpdateClientEmail() {
  const context = useContext(UpdateClientEmailContext);
  if (!context) {
    throw new Error(
      "useUpdateClientEmail must be used within a UpdateClientEmailContext.Provider",
    );
  }
  return context;
}
