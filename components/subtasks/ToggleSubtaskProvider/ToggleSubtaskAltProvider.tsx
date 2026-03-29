"use client";

import { useRouter } from "@/i18n/navigation";
import { useMemo, useActionState } from "react";
import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { ActionState, ToggleSubtaskPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

interface ToggleSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function ToggleSubtaskAltProvider({
  children,
}: ToggleSubtaskAltProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: ToggleSubtaskPayload) => {
      const newState = await toggleSubtask(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show updated subtask
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // hooks below wait for the transition to complete (reducerAction returns the new state)
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
