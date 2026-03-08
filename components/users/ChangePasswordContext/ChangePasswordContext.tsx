"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

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

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
