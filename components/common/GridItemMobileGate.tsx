"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { useViewMode } from "./ViewMode";
import { usePageTransition } from "./PageTransitionContext";

export interface GridItemMobileGateProps {
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export function GridItemMobileGate({
  skeleton,
  children,
}: GridItemMobileGateProps) {
  const isMd = useIsMd();
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (!isMd) {
    return null;
  }

  if (isViewModePending || isPageTransitionPending) {
    return <>{skeleton}</>;
  }

  return <>{children}</>;
}
