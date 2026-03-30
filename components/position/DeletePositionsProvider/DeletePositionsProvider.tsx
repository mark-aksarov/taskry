"use client";

import { useMemo, useState } from "react";
import { DeletePositionsContext } from "../DeletePositionsContext";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeletePositionsProviderProps {
  children: React.ReactNode;
}

export function DeletePositionsProvider({
  children,
}: DeletePositionsProviderProps) {
  // store IDs to track positions being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { state, action, isPending } =
    useActionStateWithRouteRefresh(deletePositions);
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
