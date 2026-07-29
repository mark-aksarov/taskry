"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { createClient } from "@/lib/actions/client/createClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const CreateClientContext = createContext<ActionContextType | null>(null);

interface CreateClientProviderProps {
  children: React.ReactNode;
}

export function CreateClientProvider({ children }: CreateClientProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createClient, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createClient");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createClient");

  return (
    <CreateClientContext.Provider value={contextValue}>
      {children}
    </CreateClientContext.Provider>
  );
}

export function useCreateClient() {
  const context = useContext(CreateClientContext);
  if (!context)
    throw new Error(
      "useCreateClient must be used within CreateClientContext.Provider",
    );
  return context;
}
