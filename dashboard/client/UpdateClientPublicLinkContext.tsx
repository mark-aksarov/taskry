"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateClientPublicLinkContext =
  createContext<ActionContextType | null>(null);

interface UpdateClientPublicLinkProviderProps {
  children: React.ReactNode;
}

export function UpdateClientPublicLinkProvider({
  children,
}: UpdateClientPublicLinkProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientPublicLink");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientPublicLink");

  return (
    <UpdateClientPublicLinkContext.Provider value={contextValue}>
      {children}
    </UpdateClientPublicLinkContext.Provider>
  );
}

export function useUpdateClientPublicLink() {
  const context = useContext(UpdateClientPublicLinkContext);
  if (!context) {
    throw new Error(
      "useUpdateClientPublicLink must be used within a UpdateClientPublicLinkContext.Provider",
    );
  }
  return context;
}
