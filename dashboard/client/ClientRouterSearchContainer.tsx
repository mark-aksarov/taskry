"use client";

import { useSelectedItems } from "../common/SelectedItemsContext";
import { RouterSearchContainer } from "../common/RouterSearchContainer";

export function ClientRouterSearchContainer() {
  // clear the selected clients when applying a new search query
  const { clear: clearSelectedItems } = useSelectedItems();

  return <RouterSearchContainer clearSelectedItems={clearSelectedItems} />;
}
