"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateUserPhoneNumberContext =
  createContext<ActionContextType | null>(null);

interface UpdateUserPhoneNumberProviderProps {
  children: React.ReactNode;
}

export function UpdateUserPhoneNumberProvider({
  children,
}: UpdateUserPhoneNumberProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserPhoneNumber");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserPhoneNumber");

  return (
    <UpdateUserPhoneNumberContext.Provider value={contextValue}>
      {children}
    </UpdateUserPhoneNumberContext.Provider>
  );
}

export function useUpdateUserPhoneNumber() {
  const context = useContext(UpdateUserPhoneNumberContext);
  if (!context) {
    throw new Error(
      "useUpdateUserPhoneNumber must be used within a UpdateUserPhoneNumberContext.Provider",
    );
  }
  return context;
}
