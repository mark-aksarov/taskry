import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ListItemInfoSkeleton } from "@/components/common/List/index";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

export const ProjectListItemSkeleton = () => {
  return (
    <ProjectListItemLayout
      titleSlot={<ListItemInfoSkeleton />}
      creatorSlot={
        <>
          <ImageContainerSkeleton className="h-9 w-9 @max-2xl:hidden" />
          <ListItemInfoSkeleton className="@max-2xl:hidden" />
        </>
      }
      customerSlot={
        <>
          <ImageContainerSkeleton className="h-9 w-9 @max-3xl:hidden" />
          <ListItemInfoSkeleton className="@max-3xl:hidden" />
        </>
      }
      categorySlot={<ListItemInfoSkeleton className="@max-4xl:hidden" />}
      companySlot={<ListItemInfoSkeleton className="@max-5xl:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-lg:hidden" />}
      commentsModalTriggerSlot={
        <ItemBaseButtonSkeleton className="@max-md:hidden" />
      }
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
};
