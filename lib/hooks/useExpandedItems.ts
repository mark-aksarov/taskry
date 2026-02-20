import { useState } from "react";

export function useExpandedItems<T>(items: T[], limit = 3) {
  const canExpand = items.length > limit;

  const [isExpanded, setIsExpanded] = useState<boolean | null>(
    canExpand ? false : null,
  );

  const expandedItems = isExpanded ? items : items.slice(0, limit);

  return { isExpanded, setIsExpanded, expandedItems, canExpand };
}
