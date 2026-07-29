"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateClientContext = createContext<ActionContextType | null>(null);

interface UpdateClientProviderProps {
  children: React.ReactNode;
}

export function UpdateClientProvider({ children }: UpdateClientProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClient");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClient");

  return (
    <UpdateClientContext.Provider value={contextValue}>
      {children}
    </UpdateClientContext.Provider>
  );
}

export function useUpdateClient() {
  const context = useContext(UpdateClientContext);
  if (!context) {
    throw new Error(
      "useUpdateClient must be used within a UpdateClientContext.Provider",
    );
  }
  return context;
}
