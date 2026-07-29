"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { deletePositions } from "@/lib/actions/position/deletePositions";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeletePositionsContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

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
      onError: () => setIds([]),
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

export function useDeletePositions() {
  const context = useContext(DeletePositionsContext);
  if (!context)
    throw new Error(
      "useDeletePositions must be used within a DeletePositionsContext.Provider",
    );
  return context;
}
