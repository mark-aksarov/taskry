import {
  TaskGridItemLargeSkeleton,
  TaskGridItemMobileSkeleton,
} from "./TaskGridItem";

import { ViewMode } from "../common/ViewMode";
import { GridSkeleton } from "../common/Grid";
import { TaskListItemSkeleton } from "./TaskListItem";

interface TaskGridSkeletonProps {
  viewMode: ViewMode;
  showCheckbox: boolean;
}

export function TaskGridSkeleton({
  viewMode,
  showCheckbox,
}: TaskGridSkeletonProps) {
  return (
    <GridSkeleton
      viewMode={viewMode}
      listItem={<TaskListItemSkeleton showCheckbox={showCheckbox} />}
      gridItemLarge={<TaskGridItemLargeSkeleton />}
      gridItemMobile={<TaskGridItemMobileSkeleton />}
    />
  );
}
