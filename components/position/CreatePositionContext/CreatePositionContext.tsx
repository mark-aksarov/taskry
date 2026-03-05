"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";
import { useRefreshPositionsOnActionSuccess } from "@/lib/hooks/useRefreshPositionsOnActionSuccess";

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
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshPositionsOnActionSuccess(state);

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
