import {
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";
import { Skeleton } from "@/components/ui";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export const TaskGridItemSkeleton = () => {
  return (
    <TaskGridItemLayout
      menuTriggerSlot={<MenuTriggerSkeleton className="-mr-2 ml-auto" />}
      titleSlot={<GridItemInfoSkeleton />}
      assigneeImageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      commentsSlot={
        <Skeleton className="h-[1.75rem] w-[3.75rem] rounded-full @max-md:hidden" />
      }
      subtasksSlot={
        <Skeleton className="h-[1.75rem] w-[3.75rem] rounded-full @max-md:hidden" />
      }
      statusSlot={
        <Skeleton className="h-[1.75rem] w-[5.625rem] rounded-full @max-md:hidden" />
      }
      progressSlot={<GridItemProgressSkeleton />}
    />
  );
};
