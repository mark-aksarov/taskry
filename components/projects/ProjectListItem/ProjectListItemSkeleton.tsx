"use client";

import { Skeleton } from "@/components/ui";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ListItemInfoSkeleton } from "@/components/common/List/index";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
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
      statusSlot={
        <Skeleton className="h-[1.75rem] w-[5.625rem] rounded-full @max-md:hidden" />
      }
      commentsModalTriggerSlot={
        <Skeleton className="h-[1.75rem] w-[3.75rem] rounded-full @max-md:hidden" />
      }
      menuTriggerSlot={<MenuTriggerSkeleton />}
    />
  );
};
