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
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";

export const ProjectListItemSkeleton = () => {
  return (
    <ProjectListItemLayout
      className="max-md:hidden"
      checkboxSlot={<CheckboxSkeleton />}
      mainSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      creatorImgSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      creatorSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      clientImgSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      clientSlot={
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
      companySlot={
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
