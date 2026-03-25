"use client";

import { useRouter } from "@/i18n/navigation";
import { useMemo, useState, useActionState } from "react";
import { UpdateProjectStatusesContext } from "../UpdateProjectStatusesContext";
import { ActionState, UpdateProjectStatusesPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";

const initialState: ActionState = {
  status: null,
};

interface UpdateProjectStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusesProvider({
  children,
}: UpdateProjectStatusesProviderProps) {
  const router = useRouter();

  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: UpdateProjectStatusesPayload) => {
      const newState = await updateProjectStatuses(payload);

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
      ids,
      setIds,
    }),
    [state, action, isPending, ids],
  );

  return (
    <UpdateProjectStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusesContext.Provider>
  );
}
