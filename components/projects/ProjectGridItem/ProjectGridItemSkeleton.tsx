import { Skeleton } from "@/components/ui";
import {
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export function ProjectGridItemSkeleton() {
  return (
    <ProjectGridItemLayout
      menuTriggerSlot={<MenuTriggerSkeleton className="-mr-2 ml-auto" />}
      titleSlot={<GridItemInfoSkeleton />}
      creatorImageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      commentsSlot={
        <Skeleton className="h-[1.75rem] w-[3.75rem] rounded-full @max-md:hidden" />
      }
      statusSlot={
        <Skeleton className="h-[1.75rem] w-[5.625rem] rounded-full @max-md:hidden" />
      }
      progressSlot={<GridItemProgressSkeleton />}
    />
  );
}
