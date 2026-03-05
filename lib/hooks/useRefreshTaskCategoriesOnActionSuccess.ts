import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshTaskCategories } from "./useRefreshTaskCategories";

export function useRefreshTaskCategoriesOnActionSuccess(state: ActionState) {
  const refreshTaskCategories = useRefreshTaskCategories();

  useEffect(() => {
    if (state.status === "success") {
      refreshTaskCategories();
    }
  }, [state, refreshTaskCategories]);
}
