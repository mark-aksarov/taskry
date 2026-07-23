"use client";

import { useRouter } from "@/i18n/navigation";
import { ClearClientImageUrlContext } from "../ClearClientImageUrlContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { updateClientImageUrl } from "@/lib/actions/client/updateClientImageUrl";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";

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
