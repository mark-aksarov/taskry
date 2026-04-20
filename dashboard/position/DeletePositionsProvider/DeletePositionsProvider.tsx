"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { DeletePositionsContext } from "../DeletePositionsContext";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeletePositionsProviderProps {
  children: React.ReactNode;
}

export function DeletePositionsProvider({
  children,
}: DeletePositionsProviderProps) {
  // store IDs to track positions being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    deletePositions,
    {
      onSuccess: () => router.refresh(),
    },
  );
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
