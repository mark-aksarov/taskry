"use client";

import { useSelectedProjects } from "./SelectedProjectsContext";
import { RouterSearchContainer } from "../common/RouterSearchContainer";

export function ProjectRouterSearchContainer() {
  // clear the selected projects when applying a new search query
  const { clear: clearSelectedItems } = useSelectedProjects();

  return <RouterSearchContainer clearSelectedItems={clearSelectedItems} />;
}
