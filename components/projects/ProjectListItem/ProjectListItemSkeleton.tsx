import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";

import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ProjectListItemLayout } from "./ProjectListItemLayout";

export const ProjectListItemSkeleton = () => {
  return (
    <ProjectListItemLayout
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
