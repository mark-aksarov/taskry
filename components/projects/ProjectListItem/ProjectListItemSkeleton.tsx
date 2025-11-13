"use client";

import { Skeleton } from "@/components/ui";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import {
  ListItemImageInfoSkeleton,
  ListItemInfoSkeleton,
} from "@/components/common/List/index";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export const ProjectListItemSkeleton = () => {
  return (
    <ProjectListItemLayout
      titleSlot={<ListItemInfoSkeleton />}
      creatorSlot={<ListItemImageInfoSkeleton className="@max-2xl:hidden" />}
      customerSlot={<ListItemImageInfoSkeleton className="@max-3xl:hidden" />}
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
