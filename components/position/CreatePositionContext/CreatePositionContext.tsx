"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const CreatePositionContext = createContext<CreateEntityContextType | null>(
  null,
);

interface CreatePositionProviderProps {
  createPosition: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreatePositionProvider({
  createPosition,
  children,
}: CreatePositionProviderProps) {
  const contextValue = useCreateEntityContextValue(createPosition);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

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
