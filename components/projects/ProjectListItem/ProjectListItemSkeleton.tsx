import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/ListItem";

import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";

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
      customerImgSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      customerSlot={
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
