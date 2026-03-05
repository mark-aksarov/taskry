import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshProjectCategories } from "./useRefreshProjectCategories";

export function useRefreshProjectCategoriesOnActionSuccess(state: ActionState) {
  const refreshProjectCategories = useRefreshProjectCategories();

  useEffect(() => {
    if (state.status === "success") {
      refreshProjectCategories();
    }
  }, [state, refreshProjectCategories]);
}
