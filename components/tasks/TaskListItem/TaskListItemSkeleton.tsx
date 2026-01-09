import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { ListItemInfoSkeleton } from "@/components/common/List";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

export const TaskListItemSkeleton = ({
  showCheckbox,
}: {
  showCheckbox?: boolean;
}) => {
  return (
    <TaskListItemLayout
      checkboxSlot={showCheckbox && <CheckboxSkeleton />}
      titleSlot={<ListItemInfoSkeleton />}
      assigneeSlot={
        <>
          <ImageContainerSkeleton className="h-9 w-9 @max-2xl:hidden" />
          <ListItemInfoSkeleton className="@max-2xl:hidden" />
        </>
      }
      categorySlot={<ListItemInfoSkeleton className="@max-3xl:hidden" />}
      projectSlot={<ListItemInfoSkeleton className="@max-4xl:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-lg:hidden" />}
      commentsModalTriggerSlot={
        <ItemBaseButtonSkeleton className="@max-md:hidden" />
      }
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
};
