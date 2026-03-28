"use client";

import { notFound } from "next/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UpdateProjectContext } from "../UpdateProjectContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface UpdateProjectProviderProps {
  projectId: number;
  children: React.ReactNode;
}

export function UpdateProjectProvider({
  projectId,
  children,
}: UpdateProjectProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateProject(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created project
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/projects") {
      throw new Error(state.message, { cause: "projectNotFound" });
    }

    notFound();
  }

  // we need to track UpdateProjectModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useModal("updateProject");

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <UpdateProjectContext.Provider value={contextValue}>
      {children}
    </UpdateProjectContext.Provider>
  );
}
