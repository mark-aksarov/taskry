"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";

export const ClearUserImageUrlContext =
  createContext<ActionContextType<string> | null>(null);

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
      onSuccess: async () => {
        router.refresh();
      },
    },
  );

  const { state } = contextValue;

  useShowToastOnActionSuccess(state);
  useShowToastOnActionError(state);

  return (
    <ClearUserImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearUserImageUrlContext.Provider>
  );
}

export function useClearUserImageUrl() {
  const context = useContext(ClearUserImageUrlContext);
  if (!context)
    throw new Error(
      "useClearImageUrl must be used within ClearUserImageUrlContext.Provider",
    );
  return context;
}
