"use client";

import { notFound } from "next/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { useChangePasswordModal } from "../ChangePasswordModal";
import { ChangePasswordContext } from "../ChangePasswordContext";
import { changePassword } from "@/lib/actions/user/changePassword";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface ChangePasswordProviderProps {
  children: React.ReactNode;
}

export function ChangePasswordProvider({
  children,
}: ChangePasswordProviderProps) {
  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await changePassword(payload);
      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  // we need to track useChangePasswordModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useChangePasswordModal();

  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <ChangePasswordContext.Provider value={contextValue}>
      {children}
    </ChangePasswordContext.Provider>
  );
}
