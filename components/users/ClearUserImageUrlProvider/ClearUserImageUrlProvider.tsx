"use client";

import { notFound } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { ClearUserImageUrlContext } from "../ClearUserImageUrlContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface ClearUserImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearUserImageUrlProvider({
  children,
}: ClearUserImageUrlProviderProps) {
  const router = useRouter();
  // when success we need to refresh current route to show that image was deleted
  const contextValue = useActionStateWithCallbacks(
    (userId: string) =>
      updateUserImageUrl({
        id: userId,
        imageUrl: null,
      }),
    {
      onSuccess: () => router.refresh(),
    },
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
