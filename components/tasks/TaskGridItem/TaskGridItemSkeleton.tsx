import {
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";
import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

export const TaskGridItemSkeleton = () => {
  return (
    <TaskGridItemLayout
      menuTriggerSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      titleSlot={<GridItemInfoSkeleton />}
      assigneeImageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      commentsSlot={<ItemBaseButtonSkeleton className="@max-md:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-md:hidden" />}
      progressSlot={<GridItemProgressSkeleton />}
    />
  );
};
