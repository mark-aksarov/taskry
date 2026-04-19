import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { ProgressSkeleton } from "@/components/ui/Skeleton";
import { GridItemInfoSkeleton } from "@/components/common/GridItem";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

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
