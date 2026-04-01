"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { DeleteProjectsContext } from "../DeleteProjectsContext";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

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
