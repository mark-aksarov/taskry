"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updatePosition } from "@/lib/actions/position/updatePosition";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdatePositionContext = createContext<ActionContextType | null>(null);

interface UpdatePositionProviderProps {
  children: React.ReactNode;
}

export function UpdatePositionProvider({
  children,
}: UpdatePositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updatePosition, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updatePosition");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updatePosition");

  return (
    <UpdatePositionContext.Provider value={contextValue}>
      {children}
    </UpdatePositionContext.Provider>
  );
}

export function useUpdatePosition() {
  const context = useContext(UpdatePositionContext);
  if (!context) {
    throw new Error(
      "useUpdatePosition must be used within a UpdatePositionContext.Provider",
    );
  }
  return context;
}
