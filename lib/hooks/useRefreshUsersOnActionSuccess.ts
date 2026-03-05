import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshUsers } from "./useRefreshUsers";

export function useRefreshUsersOnActionSuccess(state: ActionState) {
  const refreshUsers = useRefreshUsers();

  useEffect(() => {
    if (state.status === "success") {
      refreshUsers();
    }
  }, [state, refreshUsers]);
}
