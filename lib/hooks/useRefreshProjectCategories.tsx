import { useSWRConfig } from "swr";
import { useCallback } from "react";

export function useRefreshProjectCategories() {
  const { mutate } = useSWRConfig();

  return useCallback(
    () =>
      // Force revalidation of the task categories cache
      mutate("/api/project-categories", undefined, { revalidate: true }),
    [mutate],
  );
}
