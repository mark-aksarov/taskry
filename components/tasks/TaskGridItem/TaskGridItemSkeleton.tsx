import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { ProgressSkeleton } from "@/components/ui/Skeleton";
import { GridItemInfoSkeleton } from "@/components/common/Grid";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

interface TaskGridItemSkeletonProps {
  showCheckbox?: boolean;
  assigneeImageClassName?: string;
}

const TaskGridItemSkeleton = ({
  showCheckbox,
  assigneeImageClassName,
}: TaskGridItemSkeletonProps) => {
  return (
    <TaskGridItemLayout
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
  return <TaskGridItemSkeleton assigneeImageClassName="h-9 w-9" showCheckbox />;
};

export const TaskGridItemMobileSkeleton = () => {
  return <TaskGridItemSkeleton assigneeImageClassName="h-11 w-11" />;
};
