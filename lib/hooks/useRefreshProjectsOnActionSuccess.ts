import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useRefreshProjects } from "./useRefreshProjects";

export function useRefreshProjectsOnActionSuccess(state: ActionState) {
  const refreshProjects = useRefreshProjects();

  useEffect(() => {
    if (state.status === "success") {
      refreshProjects();
    }
  }, [state, refreshProjects]);
}
