"use client";

import { useViewMode } from "./ViewModeContext";

interface ViewModeLayoutProps {
  list: React.ReactNode;
  grid: React.ReactNode;
}

export function ViewModeLayout({ list, grid }: ViewModeLayoutProps) {
  const { viewMode, containerRef } = useViewMode();

  return <div ref={containerRef}>{viewMode === "list" ? list : grid}</div>;
}
