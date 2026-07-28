"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { deletePosition } from "@/lib/actions/position/deletePosition";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeletePositionContext =
  createContext<ActionContextType<number> | null>(null);

export const initialState: ActionState = {
  status: null,
};

interface DeletePositionProviderProps {
  children: React.ReactNode;
}

export function DeletePositionProvider({
  children,
}: DeletePositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deletePosition, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeletePositionContext.Provider value={contextValue}>
      {children}
    </DeletePositionContext.Provider>
  );
}

export function useDeletePosition() {
  const context = useContext(DeletePositionContext);
  if (!context)
    throw new Error(
      "useDeletePosition must be used within DeletePositionContext.Provider",
    );
  return context;
}
