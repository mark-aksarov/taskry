"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { createPosition } from "@/lib/actions/position/createPosition";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const CreatePositionContext = createContext<ActionContextType | null>(null);

interface CreatePositionProviderProps {
  children: React.ReactNode;
}

export function CreatePositionProvider({
  children,
}: CreatePositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createPosition, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createPosition");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createPosition",
  );

  return (
    <CreatePositionContext.Provider value={contextValue}>
      {children}
    </CreatePositionContext.Provider>
  );
}

export function useCreatePosition() {
  const context = useContext(CreatePositionContext);
  if (!context)
    throw new Error(
      "useCreatePosition must be used within CreatePositionContext.Provider",
    );
  return context;
}
