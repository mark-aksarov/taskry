import {
  ListItemImageInfoSkeleton,
  ListItemInfoSkeleton,
} from "@/components/common/List";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { Skeleton } from "@/components/ui";

export const TaskListItemSkeleton = () => {
  return (
    <TaskListItemLayout
      titleSlot={<ListItemInfoSkeleton />}
      assigneeSlot={<ListItemImageInfoSkeleton className="@max-2xl:hidden" />}
      categorySlot={<ListItemInfoSkeleton className="@max-3xl:hidden" />}
      projectSlot={<ListItemInfoSkeleton className="@max-4xl:hidden" />}
      statusSlot={
        <Skeleton className="h-[1.75rem] w-[5.625rem] rounded-full @max-lg:hidden" />
      }
      commentsModalTriggerSlot={
        <Skeleton className="h-[1.75rem] w-[3.75rem] rounded-full @max-md:hidden" />
      }
      subtasksModalTriggerSlot={
        <Skeleton className="h-[1.75rem] w-[3.75rem] rounded-full @max-md:hidden" />
      }
      menuTriggerSlot={<MenuTriggerSkeleton />}
    />
  );
};
