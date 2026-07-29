"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeleteProjectsContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeleteProjectsProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectsProvider({
  children,
}: DeleteProjectsProviderProps) {
  // store IDs to track projects being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    deleteProjects,
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
    <DeleteProjectsContext.Provider value={contextValue}>
      {children}
    </DeleteProjectsContext.Provider>
  );
}

export function useDeleteProjects() {
  const context = useContext(DeleteProjectsContext);
  if (!context)
    throw new Error(
      "useDeleteProjects must be used within a DeleteProjectsContext.Provider",
    );
  return context;
}
