import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import { ListItemInfoSkeleton } from "@/components/common/List";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";

export const UserTaskListItemSkeleton = () => {
  return (
    <UserTaskListItemLayout
      checkboxSlot={<CheckboxSkeleton />}
      deadlineSlot={<ListItemInfoSkeleton />}
      commentsSlot={<ItemBaseButtonSkeleton className="@max-md:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-md:hidden" />}
      actionMenuSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
};
