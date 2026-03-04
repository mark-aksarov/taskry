import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { ActionState } from "../actions/types";

export function useRefreshTaskDetailOnActionSuccess(
  state: ActionState,
  taskId: number,
) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (state.status === "success") {
      mutate(`/api/tasks/${taskId}`);
    }
  }, [state, mutate, taskId]);
}
