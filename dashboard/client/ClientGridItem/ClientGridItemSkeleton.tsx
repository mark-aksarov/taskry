import {
  GridItemRow,
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/dashboard/common/GridItem";

import { Skeleton } from "@/ui/Skeleton";
import { CheckboxSkeleton } from "@/ui/Skeleton";
import { ClientGridItemLayout } from "./ClientGridItemLayout";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/dashboard/common/ItemBase";

interface ClientGridItemSkeletonProps {
  showCheckbox?: boolean;
  imageClassName?: string;
  className?: string;
}

function ClientGridItemSkeleton({
  showCheckbox,
  imageClassName,
  className,
}: ClientGridItemSkeletonProps) {
  return (
    <ClientGridItemLayout
      className={className}
      topRowSlot={
        <GridItemRow>
          {showCheckbox && <CheckboxSkeleton />}
          <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
        </GridItemRow>
      }
      imageSlot={<ImageContainerSkeleton className={imageClassName} />}
      titleSlot={<GridItemInfoSkeleton className="flex-auto" />}
      contactSlot={
        <>
          <Skeleton className="h-px" />
          <GridItemContactListSkeleton />
        </>
      }
    />
  );
}

export const ClientGridItemLargeSkeleton = () => {
  return (
    <ClientGridItemSkeleton
      className="max-md:hidden"
      imageClassName="h-9 w-9"
      showCheckbox
    />
  );
};

export const ClientGridItemMobileSkeleton = () => {
  return (
    <ClientGridItemSkeleton className="md:hidden" imageClassName="h-11 w-11" />
  );
};
