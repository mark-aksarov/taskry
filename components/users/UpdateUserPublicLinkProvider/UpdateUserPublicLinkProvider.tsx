"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserPublicLinkContext } from "../UpdateUserPublicLinkContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserPublicLinkProviderProps {
  children: React.ReactNode;
}

export function UpdateUserPublicLinkProvider({
  children,
}: UpdateUserPublicLinkProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserPublicLink");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserPublicLink");
  useShowToastWhenModalClosedOnActionError(state, "updateUserPublicLink");

  return (
    <UpdateUserPublicLinkContext.Provider value={contextValue}>
      {children}
    </UpdateUserPublicLinkContext.Provider>
  );
}
