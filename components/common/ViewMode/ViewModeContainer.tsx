"use client";

import { useViewMode } from "./ViewModeContext";

interface ViewModeContainerProps {
  list: React.ReactNode;
  grid: React.ReactNode;
}

export function ViewModeContainer({ list, grid }: ViewModeContainerProps) {
  const { viewMode } = useViewMode();

  return <>{viewMode === "list" ? list : grid}</>;
}
