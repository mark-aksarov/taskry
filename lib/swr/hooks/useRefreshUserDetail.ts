import { useSWRConfig } from "swr";
import { useCallback } from "react";

/**
 * Refresh user detail
 * They will be revalidated with useSWR in UserDetailContainer
 */
export function useRefreshUserDetail() {
  const { mutate } = useSWRConfig();

  return useCallback(
    (userId: string) => mutate(`/api/users/${userId}`),
    [mutate],
  );
}
