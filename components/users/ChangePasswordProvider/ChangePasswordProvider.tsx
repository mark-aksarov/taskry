"use client";

import { useRouter } from "@/i18n/navigation";
import { ChangePasswordContext } from "../ChangePasswordContext";
import { changePassword } from "@/lib/actions/user/changePassword";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ChangePasswordProviderProps {
  children: React.ReactNode;
}

export function ChangePasswordProvider({
  children,
}: ChangePasswordProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(changePassword, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "changePassword");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "changePassword");

  return (
    <ChangePasswordContext.Provider value={contextValue}>
      {children}
    </ChangePasswordContext.Provider>
  );
}
