"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

const UpdateUserContext = createContext<UpdateEntityContextType | null>(null);

interface UpdateUserProviderProps {
  updateUser: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateUserProvider({
  updateUser,
  children,
}: UpdateUserProviderProps) {
  const contextValue = useUpdateEntityContextValue(updateUser);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

  return (
    <UpdateUserContext.Provider value={contextValue}>
      {children}
    </UpdateUserContext.Provider>
  );
}

export function useUpdateUser() {
  const context = useContext(UpdateUserContext);
  if (!context) {
    throw new Error("useUpdateUser must be used within a UpdateUserProvider");
  }
  return context;
}
