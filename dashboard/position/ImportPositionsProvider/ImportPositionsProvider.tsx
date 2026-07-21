"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportPositionsContext } from "../ImportPositionsContext";
import { importPositions } from "@/lib/actions/position/importPositions";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportPositionsProviderProps {
  children: React.ReactNode;
}

export function ImportPositionsProvider({
  children,
}: ImportPositionsProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importPositions, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importPositions");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importPositions",
  );

  return (
    <ImportPositionsContext.Provider value={contextValue}>
      {children}
    </ImportPositionsContext.Provider>
  );
}
