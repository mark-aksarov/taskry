"use client";

import { ActionState } from "@/lib/actions/types";
import { DeletePositionContext } from "../DeletePositionContext";
import { deletePosition } from "@/lib/actions/position/deletePosition";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

export const initialState: ActionState = {
  status: null,
};

interface DeletePositionProviderProps {
  children: React.ReactNode;
}

export function DeletePositionProvider({
  children,
}: DeletePositionProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deletePosition);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeletePositionContext.Provider value={contextValue}>
      {children}
    </DeletePositionContext.Provider>
  );
}
