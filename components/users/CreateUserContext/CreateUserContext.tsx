"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const CreateUserContext = createContext<CreateEntityContextType | null>(null);

interface CreateUserProviderProps {
  createUser: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateUserProvider({
  createUser,
  children,
}: CreateUserProviderProps) {
  const contextValue = useCreateEntityContextValue(createUser);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  return (
    <CreateUserContext.Provider value={contextValue}>
      {children}
    </CreateUserContext.Provider>
  );
}

export function useCreateUser() {
  const context = useContext(CreateUserContext);
  if (!context)
    throw new Error("useCreateUser must be used within CreateUserProvider");
  return context;
}
