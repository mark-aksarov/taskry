"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserAddressContext } from "../UpdateUserAddressContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserAddress");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserAddress");
  useShowToastWhenModalClosedOnActionError(state, "updateUserAddress");

  return (
    <UpdateUserAddressContext.Provider value={contextValue}>
      {children}
    </UpdateUserAddressContext.Provider>
  );
}
