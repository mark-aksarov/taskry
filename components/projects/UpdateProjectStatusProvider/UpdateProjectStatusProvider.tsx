"use client";

import { notFound } from "next/navigation";
import { useMemo, useActionState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UpdateProjectStatusContext } from "../UpdateProjectStatusContext";
import { ActionState, UpdateProjectStatusPayload } from "@/lib/actions/types";
import { updateProjectStatus } from "@/lib/actions/project/updateProjectStatus";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface UpdateProjectStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusProvider({
  children,
}: UpdateProjectStatusProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: UpdateProjectStatusPayload) => {
      const newState = await updateProjectStatus(state, payload);

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
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/projects") {
      throw new Error(state.message, { cause: "projectNotFound" });
    }

    notFound();
  }

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
    <UpdateProjectStatusContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}
