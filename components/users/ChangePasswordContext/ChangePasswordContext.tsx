"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

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
  const contextValue = useUpdateEntityState(changePassword);

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
