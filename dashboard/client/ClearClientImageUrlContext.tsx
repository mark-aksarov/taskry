"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { updateClientImageUrl } from "@/lib/actions/client/updateClientImageUrl";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";

const ClearClientImageUrlContext =
  createContext<ActionContextType<number> | null>(null);

interface ClearClientImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearClientImageUrlProvider({
  children,
}: ClearClientImageUrlProviderProps) {
  const router = useRouter();
  // when success we need to refresh current route to show that image was deleted
  const contextValue = useActionStateWithCallbacks(
    (clientId: number) =>
      updateClientImageUrl({
        id: clientId,
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
    <ClearClientImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearClientImageUrlContext.Provider>
  );
}

export function useClearClientImageUrl() {
  const context = useContext(ClearClientImageUrlContext);
  if (!context)
    throw new Error(
      "useClearImageUrl must be used within ClearClientImageUrlContext.Provider",
    );
  return context;
}
