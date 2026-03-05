import { useSWRConfig } from "swr";
import { useCallback } from "react";

export function useRefreshPositions() {
  const { mutate } = useSWRConfig();

  return useCallback(
    () =>
      // Force revalidation of the task categories cache
      mutate("/api/positions", undefined, { revalidate: true }),
    [mutate],
  );
}
