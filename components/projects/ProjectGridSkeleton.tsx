import {
  ProjectGridItemLargeSkeleton,
  ProjectGridItemMobileSkeleton,
} from "./ProjectGridItem";

import { ViewMode } from "../common/ViewMode";
import { EntityGridSkeleton } from "../common/EntityGrid";
import { ProjectListItemSkeleton } from "./ProjectListItem";

export function ProjectGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <EntityGridSkeleton
      viewMode={viewMode}
      listItem={<ProjectListItemSkeleton />}
      gridItemLarge={<ProjectGridItemLargeSkeleton />}
      gridItemMobile={<ProjectGridItemMobileSkeleton />}
    />
  );
}
