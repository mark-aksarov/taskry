"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const UpdateUserContext = createContext<UpdateEntityContextType | null>(null);

interface UpdateUserProviderProps {
  updateUser: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateUserProvider({
  updateUser,
  children,
}: UpdateUserProviderProps) {
  const contextValue = useUpdateEntityState(updateUser);

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
