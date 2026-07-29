"use client";

import {
  ActionState,
  ActionContextType,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";
import { useContext, createContext } from "react";

import { useRouter } from "@/i18n/navigation";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const initialState: ActionState = {
  status: null,
};

const ToggleSubtaskContext =
  createContext<ActionContextType<ToggleSubtaskPayload> | null>(null);

interface ToggleSubtaskProviderProps {
  children: React.ReactNode;
}

export function ToggleSubtaskProvider({
  children,
}: ToggleSubtaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(toggleSubtask, {
    // Re-render task/[id] on success or error to keep UI in sync
    // (e.g. show not found if deleted by another user)
    onSettled: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}

export function useToggleSubtask() {
  const context = useContext(ToggleSubtaskContext);
  if (!context) {
    throw new Error(
      "useToggleSubtask must be used within a ToggleSubtaskContext.Provider",
    );
  }
  return context;
}
