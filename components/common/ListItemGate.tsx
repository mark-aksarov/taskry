"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { useViewMode } from "./ViewMode";
import { usePageTransition } from "./PageTransitionContext";

export interface ListItemGateProps {
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export function ListItemGate({ skeleton, children }: ListItemGateProps) {
  const isMd = useIsMd();
  const { viewMode, isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isMd || viewMode === "grid") {
    return null;
  }

  if (isViewModePending || isPageTransitionPending) {
    return <>{skeleton}</>;
  }

  return <>{children}</>;
}
