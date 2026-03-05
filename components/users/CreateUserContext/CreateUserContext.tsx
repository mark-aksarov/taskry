"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useRefreshUsersOnActionSuccess } from "@/lib/hooks/useRefreshUsersOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

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
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshUsersOnActionSuccess(state);

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
