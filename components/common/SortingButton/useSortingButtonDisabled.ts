import { usePageTransition } from "../PageTransitionContext";

export function useSortingButtonDisabled() {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return isFilteringPending || isSortingPending || isPaginationPending;
}
