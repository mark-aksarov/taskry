"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { notFound } from "next/navigation";
import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const ChangePasswordContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface ChangePasswordProviderProps {
  changePassword: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function ChangePasswordProvider({
  changePassword,
  children,
}: ChangePasswordProviderProps) {
  const contextValue = useUpdateEntityContextValue(changePassword);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

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
      "useChangePassword must be used within a ChangePasswordProvider",
    );
  }
  return context;
}
function addToastOnActionErrorNotFound(state: ActionState) {
  throw new Error("Function not implemented.");
}
