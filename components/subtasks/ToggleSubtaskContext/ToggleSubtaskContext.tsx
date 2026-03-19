"use client";

import {
  useMemo,
  useEffect,
  useContext,
  createContext,
  useActionState,
} from "react";

import {
  ActionContextType,
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";

import { useRouter } from "@/i18n/navigation";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

const ToggleSubtaskContext =
  createContext<ActionContextType<ToggleSubtaskPayload> | null>(null);

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
  const router = useRouter();
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: ToggleSubtaskPayload) => {
      const newState = await toggleSubtask(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  useEffect(() => {
    refreshTaskDetail();
  }, [state, refreshTaskDetail]);

  useShowToastOnActionError(state);

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
