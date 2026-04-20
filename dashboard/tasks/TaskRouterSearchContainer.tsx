"use client";

import { useSelectedTasks } from "./SelectedTasksContext";
import { RouterSearchContainer } from "../common/RouterSearchContainer";

export function TaskRouterSearchContainer() {
  // clear the selected tasks when applying a new search query
  const { clear: clearSelectedItems } = useSelectedTasks();

  return <RouterSearchContainer clearSelectedItems={clearSelectedItems} />;
}
