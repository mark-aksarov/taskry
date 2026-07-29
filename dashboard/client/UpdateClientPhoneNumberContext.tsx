"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateClientPhoneNumberContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateClientPhoneNumberProviderProps {
  children: React.ReactNode;
}

export function UpdateClientPhoneNumberProvider({
  children,
}: UpdateClientPhoneNumberProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientPhoneNumber");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientPhoneNumber");

  return (
    <UpdateClientPhoneNumberContext.Provider value={contextValue}>
      {children}
    </UpdateClientPhoneNumberContext.Provider>
  );
}

export function useUpdateClientPhoneNumber() {
  const context = useContext(UpdateClientPhoneNumberContext);
  if (!context) {
    throw new Error(
      "useUpdateClientPhoneNumber must be used within a UpdateClientPhoneNumberContext.Provider",
    );
  }
  return context;
}
