import { useViewMode } from "@/components/common/ViewMode";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function useEntityListPending() {
  const { isPending: viewModePending } = useViewMode();

  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return (
    isPaginationPending ||
    isFilteringPending ||
    isSortingPending ||
    viewModePending
  );
}
