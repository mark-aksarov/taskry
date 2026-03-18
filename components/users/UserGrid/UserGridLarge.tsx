"use client";

import { GridLarge } from "@/components/common/Grid";
import { useViewMode } from "@/components/common/ViewMode";
import { UserGridItemLargeSkeleton } from "../UserGridItem";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function UserGridLarge({ children }: { children: React.ReactNode }) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <UserGridItemLargeSkeleton />;
  }

  return <GridLarge data-test="user-grid-large">{children}</GridLarge>;
}
