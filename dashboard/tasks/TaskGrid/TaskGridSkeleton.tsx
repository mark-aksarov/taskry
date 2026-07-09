import {
  TaskGridItemLargeSkeleton,
  TaskGridItemMobileSkeleton,
} from "../TaskGridItem";

import { ViewMode } from "../../common/ViewMode";
import { TaskListItemSkeleton } from "../TaskListItem";
import { EntityGridSkeleton } from "../../common/EntityGrid";

interface TaskGridSkeletonProps {
  viewMode: ViewMode;
  showCheckbox: boolean;
}

export function TaskGridSkeleton({
  viewMode,
  showCheckbox,
}: TaskGridSkeletonProps) {
  return (
    <EntityGridSkeleton
      viewMode={viewMode}
      listItem={<TaskListItemSkeleton showCheckbox={showCheckbox} />}
      gridItemLarge={<TaskGridItemLargeSkeleton />}
      gridItemMobile={<TaskGridItemMobileSkeleton />}
    />
  );
}
