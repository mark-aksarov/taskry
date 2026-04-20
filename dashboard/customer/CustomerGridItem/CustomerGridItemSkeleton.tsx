import {
  GridItemRow,
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/dashboard/common/GridItem";

import { Skeleton } from "@/ui/Skeleton";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";
import { CheckboxSkeleton } from "@/ui/Skeleton/CheckboxSkeleton";
import { ItemBaseActionMenuTriggerSkeleton } from "@/dashboard/common/ItemBase";

interface CustomerGridItemSkeletonProps {
  showCheckbox?: boolean;
  imageClassName?: string;
  className?: string;
}

export function CustomerGridItemSkeleton({
  showCheckbox,
  imageClassName,
  className,
}: CustomerGridItemSkeletonProps) {
  return (
    <CustomerGridItemLayout
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

export const CustomerGridItemLargeSkeleton = () => {
  return (
    <CustomerGridItemSkeleton
      className="max-md:hidden"
      imageClassName="h-9 w-9"
      showCheckbox
    />
  );
};

export const CustomerGridItemMobileSkeleton = () => {
  return (
    <CustomerGridItemSkeleton
      className="md:hidden"
      imageClassName="h-11 w-11"
    />
  );
};
