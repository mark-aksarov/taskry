"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useState, useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

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
  const contextValue = useUpdateEntityContextValue(updatePosition);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
