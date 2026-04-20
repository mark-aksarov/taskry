import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/dashboard/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/dashboard/common/ListItem";

import { TaskListItemLayout } from "./TaskListItemLayout";
import { CheckboxSkeleton } from "@/ui/Skeleton/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";

export const TaskListItemSkeleton = ({
  showCheckbox,
}: {
  showCheckbox: boolean;
}) => {
  return (
    <TaskListItemLayout
      className="max-md:hidden"
      checkboxSlot={showCheckbox ? <CheckboxSkeleton /> : undefined}
      mainSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      assigneeImgSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      assigneeSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      categorySlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      projectSlot={
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
