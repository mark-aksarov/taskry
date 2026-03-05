import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshPositions } from "./useRefreshPositions";

export function useRefreshPositionsOnActionSuccess(state: ActionState) {
  const refreshPositions = useRefreshPositions();

  useEffect(() => {
    if (state.status === "success") {
      refreshPositions();
    }
  }, [state, refreshPositions]);
}
