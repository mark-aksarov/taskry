"use client";

import { useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { UpdateUserPublicLinkContext } from "../UpdateUserPublicLinkContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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

  useCloseModalOnActionSuccess(contextValue.state, "updateUserPublicLink");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserPublicLink");

  return (
    <UpdateUserPublicLinkContext.Provider value={contextValue}>
      {children}
    </UpdateUserPublicLinkContext.Provider>
  );
}
