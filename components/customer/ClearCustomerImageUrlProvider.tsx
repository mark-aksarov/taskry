"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import { ClearCustomerImageUrlContext } from "./ClearCustomerImageUrlContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useClearImageUrlActionState } from "@/lib/hooks/useClearImageUrlActionState";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";

interface ClearCustomerImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearCustomerImageUrlProvider({
  children,
}: ClearCustomerImageUrlProviderProps) {
  const [state, action, isPending] = useClearImageUrlActionState(
    updateCustomerImageUrl,
  );

  // wait for the transition (reducerAction returning new state) to finish

  // Customers can delete their image only from their profile page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  // If errorCode is not "notFound", show a toast
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return (
    <ClearCustomerImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearCustomerImageUrlContext.Provider>
  );
}
