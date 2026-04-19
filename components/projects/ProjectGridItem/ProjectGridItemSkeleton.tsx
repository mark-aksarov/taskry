import {
  ItemBaseBadgeSkeleton,
  ItemBaseButtonSkeleton,
  ItemBaseActionMenuTriggerSkeleton,
} from "@/components/common/ItemBase";

import { ProgressSkeleton } from "@/components/ui/Skeleton";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { GridItemInfoSkeleton } from "@/components/common/GridItem";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";

interface ProjectGridItemSkeletonProps {
  showCheckbox?: boolean;
  creatorImageClassName?: string;
  className?: string;
}

function ProjectGridItemSkeleton({
  showCheckbox,
  creatorImageClassName,
  className,
}: ProjectGridItemSkeletonProps) {
  return (
    <ProjectGridItemLayout
      className={className}
      checkboxSlot={showCheckbox ? <CheckboxSkeleton /> : undefined}
      menuTriggerSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      mainSlot={<GridItemInfoSkeleton />}
      creatorImageSlot={
        <ImageContainerSkeleton className={creatorImageClassName} />
      }
      commentsSlot={<ItemBaseButtonSkeleton />}
      statusSlot={<ItemBaseBadgeSkeleton />}
      progressSlot={<ProgressSkeleton />}
    />
  );
}

export const ProjectGridItemLargeSkeleton = () => {
  return (
    <ProjectGridItemSkeleton
      className="max-md:hidden"
      creatorImageClassName="h-9 w-9"
      showCheckbox
    />
  );
};

export const ProjectGridItemMobileSkeleton = () => {
  return (
    <ProjectGridItemSkeleton
      className="md:hidden"
      creatorImageClassName="h-11 w-11"
    />
  );
};
