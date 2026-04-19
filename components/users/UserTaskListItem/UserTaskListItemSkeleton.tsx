import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/ListItem";

import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";

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
