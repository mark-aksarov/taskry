import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";

import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";

export const UserTaskListItemSkeleton = () => {
  return (
    <UserTaskListItemLayout
      checkboxSlot={<CheckboxSkeleton />}
      mainSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      mainMobileSlot={
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
