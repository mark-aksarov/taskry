import { usePageTransition } from "../PageTransitionContext";

export function useActionsButtonDisabled(selectedIds: number[]) {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  // Disable actions during transitions, without selection, or while deleting
  const isDisabled =
    isFilteringPending ||
    isSortingPending ||
    isPaginationPending ||
    selectedIds.length === 0;

  return isDisabled;
}
