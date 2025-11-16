import { ListItemInfoSkeleton } from "@/components/common/List";
import { ProfileTaskListItemLayout } from "./ProfileTaskListItemLayout";
import {
  ItemBaseActionMenuTriggerSkeleton,
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
} from "@/components/common/ItemBase";

export const ProfileTaskListItemSkeleton = () => {
  return (
    <ProfileTaskListItemLayout
      deadlineSlot={<ListItemInfoSkeleton />}
      commentsSlot={<ItemBaseButtonSkeleton className="@max-md:hidden" />}
      subtasksSlot={<ItemBaseButtonSkeleton className="@max-md:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-md:hidden" />}
      actionMenuSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
};
