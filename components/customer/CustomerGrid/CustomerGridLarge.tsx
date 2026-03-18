"use client";

import { Children } from "react";
import { GridLarge } from "@/components/common/Grid";
import { useViewMode } from "@/components/common/ViewMode";
import { CustomerGridLargeSkeleton } from "./CustomerGridLargeSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function CustomerGridLarge({ children }: { children: React.ReactNode }) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return <CustomerGridLargeSkeleton items={Children.count(children)} />;
  }

  return <GridLarge data-test="customer-grid-large">{children}</GridLarge>;
}
