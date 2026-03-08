"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

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

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
