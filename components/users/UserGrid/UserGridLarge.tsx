"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { useViewMode } from "@/components/common/ViewMode";
import { UserGridLargeSkeleton } from "./UserGridLargeSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function UserGridLarge({ children }: { children: React.ReactNode }) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <UserGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="user-grid-large">{children}</GridLarge>;
}
