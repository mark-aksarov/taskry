"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { DeleteProjectContext } from "../DeleteProjectContext";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { ActionState, DeleteProjectPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeleteProjectProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectProvider({
  children,
}: DeleteProjectProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: DeleteProjectPayload) => {
      const newState = await deleteProject(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update project list
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
    <DeleteProjectContext.Provider value={contextValue}>
      {children}
    </DeleteProjectContext.Provider>
  );
}
