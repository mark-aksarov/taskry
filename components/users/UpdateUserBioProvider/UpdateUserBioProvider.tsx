"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserBioContext } from "../UpdateUserBioContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserBioProviderProps {
  children: React.ReactNode;
}

export function UpdateUserBioProvider({
  children,
}: UpdateUserBioProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserBio");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserBio");
  useShowToastWhenModalClosedOnActionError(state, "updateUserBio");

  return (
    <UpdateUserBioContext.Provider value={contextValue}>
      {children}
    </UpdateUserBioContext.Provider>
  );
}
