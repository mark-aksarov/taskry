"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserBirthdateContext } from "../UpdateUserBirthdateContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserBirthdateProviderProps {
  children: React.ReactNode;
}

export function UpdateUserBirthdateProvider({
  children,
}: UpdateUserBirthdateProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserBirthdate");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserBirthdate");
  useShowToastWhenModalClosedOnActionError(state, "updateUserBirthdate");

  return (
    <UpdateUserBirthdateContext.Provider value={contextValue}>
      {children}
    </UpdateUserBirthdateContext.Provider>
  );
}
