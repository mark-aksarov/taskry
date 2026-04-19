import {
  ProjectGridItemLargeSkeleton,
  ProjectGridItemMobileSkeleton,
} from "./ProjectGridItem";

import { ViewMode } from "../common/ViewMode";
import { GridSkeleton } from "../common/Grid";
import { ProjectListItemSkeleton } from "./ProjectListItem";

export function ProjectGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <GridSkeleton
      viewMode={viewMode}
      listItem={<ProjectListItemSkeleton />}
      gridItemLarge={<ProjectGridItemLargeSkeleton />}
      gridItemMobile={<ProjectGridItemMobileSkeleton />}
    />
  );
}
