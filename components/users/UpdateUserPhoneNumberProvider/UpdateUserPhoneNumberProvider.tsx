"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserPhoneNumberContext } from "../UpdateUserPhoneNumberContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserPhoneNumber");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserPhoneNumber");
  useShowToastWhenModalClosedOnActionError(state, "updateUserPhoneNumber");

  return (
    <UpdateUserPhoneNumberContext.Provider value={contextValue}>
      {children}
    </UpdateUserPhoneNumberContext.Provider>
  );
}
