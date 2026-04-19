"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { useViewMode } from "./ViewMode";
import { usePageTransition } from "./PageTransitionContext";

export interface GridItemLargeGateProps {
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export function GridItemLargeGate({
  skeleton,
  children,
}: GridItemLargeGateProps) {
  const isMd = useIsMd();
  const { viewMode, isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isMd || viewMode === "list") {
    return null;
  }

  if (isViewModePending || isPageTransitionPending) {
    return <>{skeleton}</>;
  }

  return <>{children}</>;
}
