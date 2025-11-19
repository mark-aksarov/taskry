"use client";

import { useViewMode } from "./ViewModeContext";

interface ViewModeLayoutProps {
  list: React.ReactNode;
  grid: React.ReactNode;
}

export function ViewModeLayout({ list, grid }: ViewModeLayoutProps) {
  const { viewMode } = useViewMode();

  return <>{viewMode === "list" ? list : grid}</>;
}
