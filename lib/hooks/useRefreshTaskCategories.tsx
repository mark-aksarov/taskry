import { useSWRConfig } from "swr";
import { useCallback } from "react";

export function useRefreshTaskCategories() {
  const { mutate } = useSWRConfig();

  return useCallback(
    () =>
      // Force revalidation of the task categories cache
      mutate("/api/task-categories", undefined, { revalidate: true }),
    [mutate],
  );
}
