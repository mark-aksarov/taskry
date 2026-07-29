import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/dashboard/common/ItemBase";

import { CheckboxSkeleton } from "@/ui/Skeleton";
import { ProgressSkeleton } from "@/ui/Skeleton";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { GridItemInfoSkeleton } from "@/dashboard/common/GridItem";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";

interface TaskGridItemSkeletonProps {
  showCheckbox?: boolean;
  assigneeImageClassName?: string;
  className?: string;
}

const TaskGridItemSkeleton = ({
  showCheckbox,
  assigneeImageClassName,
  className,
}: TaskGridItemSkeletonProps) => {
  return (
    <TaskGridItemLayout
      className={className}
      checkboxSlot={showCheckbox ? <CheckboxSkeleton /> : undefined}
      menuTriggerSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      titleSlot={<GridItemInfoSkeleton />}
      assigneeImageSlot={
        <ImageContainerSkeleton className={assigneeImageClassName} />
      }
      commentsSlot={<ItemBaseButtonSkeleton />}
      statusSlot={<ItemBaseBadgeSkeleton />}
      progressSlot={<ProgressSkeleton />}
    />
  );
};

export const TaskGridItemLargeSkeleton = () => {
  return (
    <TaskGridItemSkeleton
      className="max-md:hidden"
      assigneeImageClassName="h-9 w-9"
      showCheckbox
    />
  );
};

export const TaskGridItemMobileSkeleton = () => {
  return (
    <TaskGridItemSkeleton
      className="md:hidden"
      assigneeImageClassName="h-11 w-11"
    />
  );
};
