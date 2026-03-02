"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreatePositionContext = createContext<CreateEntityContextType | null>(
  null,
);

export function CreatePositionProvider({
  createPosition,
  children,
}: {
  createPosition: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createPosition);

  return (
    <CreatePositionContext.Provider value={contextValue}>
      {children}
    </CreatePositionContext.Provider>
  );
}

export function useCreatePosition() {
  const context = useContext(CreatePositionContext);
  if (!context)
    throw new Error(
      "useCreatePosition must be used within CreatePositionProvider",
    );
  return context;
}
