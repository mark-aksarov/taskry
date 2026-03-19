import { useState } from "react";

export function useFilterCheckboxGroupExpansion<
  T extends { id: string | number },
>(items: T[], value: string[], limit = 3) {
  // Can this filter group be expanded at all
  const canExpand = items.length > limit;

  // null = no button, false = collapsed, true = expanded
  const [isExpanded, setIsExpanded] = useState<boolean | null>(
    canExpand ? false : null,
  );

  // Items currently visible to the user
  const visibleItems = isExpanded ? items : items.slice(0, limit);

  // Items hidden when collapsed
  const hiddenItems = isExpanded ? [] : items.slice(limit);

  // Count of selected items among the hidden ones
  const hiddenSelectedItems = hiddenItems.filter((item) =>
    value.includes(item.id.toString()),
  );

  return {
    isExpanded,
    setIsExpanded,
    visibleItems,
    hiddenItems,
    hiddenSelectedItems,
    hiddenSelectedCount: hiddenSelectedItems.length,
    canExpand,
  };
}
