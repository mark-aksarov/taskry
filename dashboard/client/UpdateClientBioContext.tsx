"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateClientBioContext = createContext<ActionContextType | null>(null);

interface UpdateClientBioProviderProps {
  children: React.ReactNode;
}

export function UpdateClientBioProvider({
  children,
}: UpdateClientBioProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientBio");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientBio");

  return (
    <UpdateClientBioContext.Provider value={contextValue}>
      {children}
    </UpdateClientBioContext.Provider>
  );
}

export function useUpdateClientBio() {
  const context = useContext(UpdateClientBioContext);
  if (!context) {
    throw new Error(
      "useUpdateClientBio must be used within a UpdateClientBioContext.Provider",
    );
  }
  return context;
}
