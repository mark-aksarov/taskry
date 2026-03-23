"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import { ClearUserImageUrlContext } from "./ClearUserImageUrlContext/ClearUserImageUrlContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useClearImageUrlActionState } from "@/lib/hooks/useClearImageUrlActionState";

interface ClearUserImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearUserImageUrlProvider({
  children,
}: ClearUserImageUrlProviderProps) {
  const [state, action, isPending] =
    useClearImageUrlActionState(updateUserImageUrl);

  // wait for the transition (reducerAction returning new state) to finish

  // Users can delete their image only from their profile page,
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
    <ClearUserImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearUserImageUrlContext.Provider>
  );
}
