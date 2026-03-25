"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useMemo, useState, useActionState } from "react";
import { DeletePositionsContext } from "../DeletePositionsContext";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeletePositionsProviderProps {
  children: React.ReactNode;
}

export function DeletePositionsProvider({
  children,
}: DeletePositionsProviderProps) {
  const router = useRouter();

  // store IDs to track positions being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, ids: number[]) => {
      const newState = await deletePositions(state, ids);

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
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeletePositionsContext.Provider value={contextValue}>
      {children}
    </DeletePositionsContext.Provider>
  );
}
