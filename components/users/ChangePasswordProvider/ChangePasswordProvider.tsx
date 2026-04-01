"use client";

import { notFound } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { ChangePasswordContext } from "../ChangePasswordContext";
import { changePassword } from "@/lib/actions/user/changePassword";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "changePassword",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "changePassword",
  );
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "changePassword",
  );

  return (
    <ChangePasswordContext.Provider value={contextValue}>
      {children}
    </ChangePasswordContext.Provider>
  );
}
