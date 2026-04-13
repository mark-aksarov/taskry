import { useSWRConfig } from "swr";
import { useCallback } from "react";

/**
 * Refresh task detail
 * They will be revalidated with useSWR in TaskDetailContainer
 */
export function useRefreshTaskDetail(taskId: number) {
  const { mutate } = useSWRConfig();

  return useCallback(() => mutate(`/api/tasks/${taskId}`), [mutate, taskId]);
}
