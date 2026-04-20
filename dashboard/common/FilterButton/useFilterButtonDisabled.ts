import { usePageTransition } from "../PageTransitionContext";

export function useFilterButtonDisabled() {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return isFilteringPending || isSortingPending || isPaginationPending;
}
