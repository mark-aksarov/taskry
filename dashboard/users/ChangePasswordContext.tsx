"use client";

import { useRouter } from "@/i18n/navigation";
import { createContext, useContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { changePassword } from "@/lib/actions/user/changePassword";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const ChangePasswordContext = createContext<ActionContextType | null>(null);

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

export function useChangePassword() {
  const context = useContext(ChangePasswordContext);
  if (!context) {
    throw new Error(
      "useChangePassword must be used within a ChangePasswordContext.Provider",
    );
  }
  return context;
}
