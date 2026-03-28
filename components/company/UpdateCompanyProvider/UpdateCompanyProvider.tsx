"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { UpdateCompanyContext } from "../UpdateCompanyContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface UpdateCompanyProviderProps {
  companyId: number;
  children: React.ReactNode;
}

export function UpdateCompanyProvider({
  companyId,
  children,
}: UpdateCompanyProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateCompany(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show updated company
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "companyNotFound" });
  }

  // we need to track UpdateCompanyModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useModal("updateCompany");

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
    <UpdateCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyContext.Provider>
  );
}
