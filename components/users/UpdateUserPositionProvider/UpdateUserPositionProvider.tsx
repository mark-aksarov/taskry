"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserPositionContext } from "../UpdateUserPositionContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserPositionProviderProps {
  children: React.ReactNode;
}

export function UpdateUserPositionProvider({
  children,
}: UpdateUserPositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserPosition");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserPosition");
  useShowToastWhenModalClosedOnActionError(state, "updateUserPosition");

  return (
    <UpdateUserPositionContext.Provider value={contextValue}>
      {children}
    </UpdateUserPositionContext.Provider>
  );
}
