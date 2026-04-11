"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserFullNameContext } from "../UpdateUserFullNameContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserFullNameProviderProps {
  children: React.ReactNode;
}

export function UpdateUserFullNameProvider({
  children,
}: UpdateUserFullNameProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserFullName");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserFullName");
  useShowToastWhenModalClosedOnActionError(state, "updateUserFullName");

  return (
    <UpdateUserFullNameContext.Provider value={contextValue}>
      {children}
    </UpdateUserFullNameContext.Provider>
  );
}
