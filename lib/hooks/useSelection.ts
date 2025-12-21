"use client";

import { useState, useCallback, useMemo } from "react";

export function useSelection() {
  const [selectedIds, setSelectedIds] = useState<Record<number, boolean>>({});

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds({});
  }, []);

  const selectedCount = useMemo(
    () => Object.values(selectedIds).filter(Boolean).length,
    [selectedIds],
  );

  return {
    selectedIds,
    toggleSelection,
    clearSelection,
    selectedCount,
  };
}

export type UseSelectionType = ReturnType<typeof useSelection>;
