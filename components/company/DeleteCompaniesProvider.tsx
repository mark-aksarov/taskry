"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useMemo, useState, useActionState } from "react";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { DeleteCompaniesContext } from "./DeleteCompaniesContext/DeleteCompaniesContext";

const initialState: ActionState = {
  status: null,
};

interface DeleteCompaniesProviderProps {
  children: React.ReactNode;
}

export function DeleteCompaniesProvider({
  children,
}: DeleteCompaniesProviderProps) {
  const router = useRouter();

  // store IDs to track companies being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, ids: number[]) => {
      const newState = await deleteCompanies(state, ids);

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
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteCompaniesContext.Provider value={contextValue}>
      {children}
    </DeleteCompaniesContext.Provider>
  );
}
