"use client";

import { ActionState } from "@/lib/actions/types";
import { CreatePositionContext } from "../CreatePositionContext";
import { createPosition } from "@/lib/actions/position/createPosition";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

interface CreatePositionProviderProps {
  children: React.ReactNode;
}

export function CreatePositionProvider({
  children,
}: CreatePositionProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createPosition);

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createPosition",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createPosition",
  );
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
