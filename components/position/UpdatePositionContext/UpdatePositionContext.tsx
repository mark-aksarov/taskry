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

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "positionNotFound" });
  }

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
