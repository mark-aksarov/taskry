import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshCompanies } from "./useRefreshCompanies";

export function useRefreshCompaniesOnActionSuccess(state: ActionState) {
  const refreshCompanies = useRefreshCompanies();

  useEffect(() => {
    if (state.status === "success") {
      refreshCompanies();
    }
  }, [state, refreshCompanies]);
}
