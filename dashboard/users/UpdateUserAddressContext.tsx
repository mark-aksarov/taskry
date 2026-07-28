"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateUserAddressContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateUserAddressProviderProps {
  children: React.ReactNode;
}

export function UpdateUserAddressProvider({
  children,
}: UpdateUserAddressProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserAddress");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserAddress");

  return (
    <UpdateUserAddressContext.Provider value={contextValue}>
      {children}
    </UpdateUserAddressContext.Provider>
  );
}

export function useUpdateUserAddress() {
  const context = useContext(UpdateUserAddressContext);
  if (!context) {
    throw new Error(
      "useUpdateUserAddress must be used within a UpdateUserAddressContext.Provider",
    );
  }
  return context;
}
