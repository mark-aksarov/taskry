import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";

import { TaskListItemLayout } from "./TaskListItemLayout";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

export const TaskListItemSkeleton = ({
  showCheckbox,
}: {
  showCheckbox?: boolean;
}) => {
  return (
    <TaskListItemLayout
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
