"use client";

import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshTaskDetailOnActionSuccess } from "@/lib/hooks/useRefreshTaskDetailOnActionSuccess";
import { createContext, useActionState, useContext, useMemo } from "react";

export const initialState: ActionState = {
  status: null,
};

export interface ToggleEntityContextType {
  state: ActionState;
  action: (payload: ToggleSubtaskPayload) => void;
  isPending: boolean;
}

const ToggleSubtaskContext = createContext<ToggleEntityContextType | null>(
  null,
);

interface ToggleSubtaskProviderProps {
  taskId: number;
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  children: React.ReactNode;
}

export function ToggleSubtaskProvider({
  taskId,
  toggleSubtask,
  children,
}: ToggleSubtaskProviderProps) {
  const [state, action, isPending] = useActionState(
    toggleSubtask,
    initialState,
  );

  useToastOnActionError(state);
  useRefreshTaskDetailOnActionSuccess(state, taskId);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

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
      "useToggleSubtask must be used within a ToggleSubtaskProvider",
    );
  }
  return context;
}
