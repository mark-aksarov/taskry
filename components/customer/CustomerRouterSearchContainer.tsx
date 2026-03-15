"use client";

import { useSelectedItems } from "../common/SelectedItemsContext";
import { RouterSearchContainer } from "../common/RouterSearchContainer";

export function CustomerRouterSearchContainer() {
  // clear the selected customers when applying a new search query
  const { clear: clearSelectedItems } = useSelectedItems();

  return <RouterSearchContainer clearSelectedItems={clearSelectedItems} />;
}
