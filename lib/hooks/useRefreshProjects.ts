import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useRefreshProjects() {
  const { mutate } = useSWRConfig();

  return useCallback(
    // Force revalidation of the users cache
    () => mutate("/api/projects", undefined, { revalidate: true }),
    [mutate],
  );
}
