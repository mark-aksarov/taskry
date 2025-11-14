import { Skeleton } from "@/components/ui";
import { ListItemInfoSkeleton } from "@/components/common/List";
import { ProfileTaskListItemLayout } from "./ProfileTaskListItemLayout";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export const ProfileTaskListItemSkeleton = () => {
  return (
    <ProfileTaskListItemLayout
      deadlineSlot={<ListItemInfoSkeleton />}
      commentsSlot={<Skeleton className="h-8 w-[3.75rem]" />}
      subtasksSlot={
        <Skeleton className="h-[2rem] w-[3.75rem] @max-md:hidden" />
      }
      statusSlot={
        <Skeleton className="h-[1.75rem] w-[5.625rem] rounded-full @max-md:hidden" />
      }
      actionMenuSlot={<MenuTriggerSkeleton />}
    />
  );
};
