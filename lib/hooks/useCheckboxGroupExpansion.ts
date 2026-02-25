import { useState, useMemo } from "react";

export function useCheckboxGroupExpansion<T extends { id: string | number }>(
  items: T[],
  selectedIds: (string | number)[],
  limit = 3,
) {
  // Whether the list can be expanded at all
  const canExpand = items.length > limit;

  // null = no button, false = collapsed, true = expanded
  const [isExpanded, setIsExpanded] = useState<boolean | null>(
    canExpand ? false : null,
  );

  const visibleItems = isExpanded ? items : items.slice(0, limit);
  const hiddenItems = isExpanded ? [] : items.slice(limit);

  // Count of selected items among the hidden ones
  const hiddenSelectedCount = hiddenItems.filter((item) =>
    selectedIds.includes(item.id),
  ).length;

  return {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedCount,
    canExpand,
  };
}
