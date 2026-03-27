"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useCreateUserModal } from "../CreateUserModal";
import { CreateUserContext } from "../CreateUserContext";
import { createUser } from "@/lib/actions/user/createUser";
import { useContext, useActionState, useMemo } from "react";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface CreateUserProviderProps {
  children: React.ReactNode;
}

export function CreateUserProvider({ children }: CreateUserProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await createUser(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created user
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreateUserModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useCreateUserModal();

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
    <CreateUserContext.Provider value={contextValue}>
      {children}
    </CreateUserContext.Provider>
  );
}

export function useCreateUser() {
  const context = useContext(CreateUserContext);
  if (!context)
    throw new Error("useCreateUser must be used within CreateUserProvider");
  return context;
}
