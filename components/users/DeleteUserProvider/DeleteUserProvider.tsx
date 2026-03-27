"use client";

import { useActionState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { DeleteUserContext } from "../DeleteUserContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { ActionState, DeleteUserPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeleteUserProviderProps {
  children: React.ReactNode;
}

export function DeleteUserProvider({ children }: DeleteUserProviderProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: DeleteUserPayload) => {
      const newState = await deleteUser(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update customer list
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    if (
      (pathname.startsWith("/team") && params.id) ||
      pathname.startsWith("/profile")
    ) {
      notFound();
    }
    throw new Error(state.message, { cause: "userNotFound" });
  }

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
    <DeleteUserContext.Provider value={contextValue}>
      {children}
    </DeleteUserContext.Provider>
  );
}
