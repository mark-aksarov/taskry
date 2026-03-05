import { useSWRConfig } from "swr";
import { useCallback } from "react";

export function useRefreshCompanies() {
  const { mutate } = useSWRConfig();

  return useCallback(
    () =>
      // Force revalidation of the task categories cache
      mutate("/api/companies", undefined, { revalidate: true }),
    [mutate],
  );
}
