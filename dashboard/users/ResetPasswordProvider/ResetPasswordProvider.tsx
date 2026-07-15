"use client";

import { useRouter } from "@/i18n/navigation";
import { ResetPasswordContext } from "../ResetPasswordContext";
import { resetPassword } from "@/lib/actions/user/resetPassword";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ResetPasswordProviderProps {
  children: React.ReactNode;
}

export function ResetPasswordProvider({
  children,
}: ResetPasswordProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(resetPassword, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "resetPassword");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "resetPassword");

  return (
    <ResetPasswordContext.Provider value={contextValue}>
      {children}
    </ResetPasswordContext.Provider>
  );
}
