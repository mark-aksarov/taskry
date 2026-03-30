import { useRouter } from "@/i18n/navigation";
import { ActionState } from "../actions/types";
import { useActionStateWithOnSuccess } from "./useActionStateWithOnSuccess";

// hook which refreshes the current route after a successful action
export function useActionStateWithRouteRefresh<T>(
  action: (payload: T) => Promise<ActionState>,
) {
  // router.refresh is wrapped in startTransition internally
  // when success we need to refresh current route to show updated data
  const router = useRouter();
  return useActionStateWithOnSuccess(action, () => router.refresh());
}
