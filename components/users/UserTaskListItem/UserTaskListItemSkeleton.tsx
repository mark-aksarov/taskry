import { ListItemInfoSkeleton } from "@/components/common/List";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import {
  ItemBaseActionMenuTriggerSkeleton,
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
} from "@/components/common/ItemBase";

export const UserTaskListItemSkeleton = () => {
  return (
    <UserTaskListItemLayout
      deadlineSlot={<ListItemInfoSkeleton />}
      commentsSlot={<ItemBaseButtonSkeleton className="@max-md:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-md:hidden" />}
      actionMenuSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
};
