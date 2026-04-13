import { useSWRConfig } from "swr";
import { useCallback } from "react";

/**
 * Refresh customer detail
 * They will be revalidated with useSWR in CustomerDetailContainer
 */
export function useRefreshCustomerDetail() {
  const { mutate } = useSWRConfig();

  return useCallback(
    (customerId: number) => mutate(`/api/customers/${customerId}`),
    [mutate],
  );
}
