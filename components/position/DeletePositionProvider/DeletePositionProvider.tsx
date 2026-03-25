"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { DeletePositionContext } from "../DeletePositionContext";
import { deletePosition } from "@/lib/actions/position/deletePosition";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

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

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, positionId: number) => {
      const newState = await deletePosition(positionId);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update position list
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // wait for transition to finish
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <DeletePositionContext.Provider value={contextValue}>
      {children}
    </DeletePositionContext.Provider>
  );
}
