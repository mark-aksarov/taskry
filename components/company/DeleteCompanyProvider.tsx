"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { deleteCompany } from "@/lib/actions/company/deleteCompany";
import { DeleteCompanyContext } from "./DeleteCompanyContext/DeleteCompanyContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

interface DeleteCompanyProviderProps {
  children: React.ReactNode;
}

export function DeleteCompanyProvider({
  children,
}: DeleteCompanyProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, companyId: number) => {
      const newState = await deleteCompany(state, companyId);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update company list
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
    <DeleteCompanyContext.Provider value={contextValue}>
      {children}
    </DeleteCompanyContext.Provider>
  );
}
