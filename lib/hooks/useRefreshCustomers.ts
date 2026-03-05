import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useRefreshCustomers() {
  const { mutate } = useSWRConfig();

  return useCallback(
    // Force revalidation of the users cache
    () => mutate("/api/customers", undefined, { revalidate: true }),
    [mutate],
  );
}
