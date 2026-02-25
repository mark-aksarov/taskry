import {
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";

import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";

export function ProjectGridItemSkeleton() {
  return (
    <ProjectGridItemLayout
      checkboxSlot={<CheckboxSkeleton />}
      menuTriggerSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      titleSlot={<GridItemInfoSkeleton />}
      creatorImageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      commentsSlot={<ItemBaseButtonSkeleton className="@max-md:hidden" />}
      statusSlot={<ItemBaseBadgeSkeleton className="@max-md:hidden" />}
      progressSlot={<GridItemProgressSkeleton />}
    />
  );
}
