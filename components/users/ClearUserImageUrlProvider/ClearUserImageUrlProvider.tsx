"use client";

import { notFound } from "next/navigation";
import { ClearUserImageUrlContext } from "../ClearUserImageUrlContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface ClearUserImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearUserImageUrlProvider({
  children,
}: ClearUserImageUrlProviderProps) {
  // when success we need to refresh current route to show that image was deleted
  const contextValue = useActionStateWithRouteRefresh((userId: string) =>
    updateUserImageUrl({
      id: userId,
      imageUrl: null,
    }),
  );

  const { state } = contextValue;

  // users can delete user image only from users/[id] page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useShowToastOnActionError(state);

  return (
    <ClearUserImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearUserImageUrlContext.Provider>
  );
}
