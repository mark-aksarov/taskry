"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { createContext, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const UpdatePositionContext = createContext<UpdateEntityContextType | null>(
  null,
);

interface UpdatePositionProviderProps {
  updatePosition: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdatePositionProvider({
  updatePosition,
  children,
}: UpdatePositionProviderProps) {
  const contextValue = useUpdateEntityState(updatePosition);

  return (
    <UpdatePositionContext.Provider value={contextValue}>
      {children}
    </UpdatePositionContext.Provider>
  );
}

export function useUpdatePosition() {
  const context = useContext(UpdatePositionContext);
  if (!context) {
    throw new Error(
      "useUpdatePosition must be used within a UpdatePositionProvider",
    );
  }
  return context;
}
