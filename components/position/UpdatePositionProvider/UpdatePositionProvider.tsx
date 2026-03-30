"use client";

import { UpdatePositionContext } from "../UpdatePositionContext";
import { updatePosition } from "@/lib/actions/position/updatePosition";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdatePositionProviderProps {
  children: React.ReactNode;
}

export function UpdatePositionProvider({
  children,
}: UpdatePositionProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(updatePosition);

  const { state } = contextValue;

  // if the position was not found (e.g. deleted by another user)
  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "positionNotFound" });
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updatePosition");
  useShowToastWhenModalClosedOnActionSuccess(state, "updatePosition");
  useShowToastWhenModalClosedOnActionError(state, "updatePosition");

  return (
    <UpdatePositionContext.Provider value={contextValue}>
      {children}
    </UpdatePositionContext.Provider>
  );
}
