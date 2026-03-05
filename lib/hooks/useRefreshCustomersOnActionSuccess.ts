import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshCustomers } from "./useRefreshCustomers";

export function useRefreshCustomersOnActionSuccess(state: ActionState) {
  const refreshCustomers = useRefreshCustomers();

  useEffect(() => {
    if (state.status === "success") {
      refreshCustomers();
    }
  }, [state, refreshCustomers]);
}
