"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreateUserContext = createContext<CreateEntityContextType | null>(null);

export function CreateUserProvider({
  createUser,
  children,
}: {
  createUser: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createUser);

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
