import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/dashboard/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/dashboard/common/ListItem";

import { CheckboxSkeleton } from "@/ui/Skeleton";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";

export const UserTaskListItemSkeleton = () => {
  return (
    <UserTaskListItemLayout
      className="max-md:hidden"
      checkboxSlot={<CheckboxSkeleton />}
      mainSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      statusSlot={<ItemBaseBadgeSkeleton />}
      commentsModalTriggerSlot={<ItemBaseButtonSkeleton />}
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
};
