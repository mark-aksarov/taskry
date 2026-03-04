"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

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
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
