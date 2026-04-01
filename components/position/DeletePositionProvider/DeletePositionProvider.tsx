"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { DeletePositionContext } from "../DeletePositionContext";
import { deletePosition } from "@/lib/actions/position/deletePosition";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const initialState: ActionState = {
  status: null,
};

interface DeletePositionProviderProps {
  children: React.ReactNode;
}

export function DeletePositionProvider({
  children,
}: DeletePositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deletePosition, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeletePositionContext.Provider value={contextValue}>
      {children}
    </DeletePositionContext.Provider>
  );
}
