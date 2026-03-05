import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useRefreshUsers() {
  const { mutate } = useSWRConfig();

  return useCallback(
    // Force revalidation of the users cache
    () => mutate("/api/users", undefined, { revalidate: true }),
    [mutate],
  );
}
