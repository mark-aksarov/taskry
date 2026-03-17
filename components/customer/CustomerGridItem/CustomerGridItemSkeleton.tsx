import {
  GridItemRow,
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";

import { Skeleton } from "@/components/ui/Skeleton";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

interface CustomerGridItemSkeletonProps {
  showCheckbox?: boolean;
  imageClassName?: string;
}

export function CustomerGridItemSkeleton({
  showCheckbox,
  imageClassName,
}: CustomerGridItemSkeletonProps) {
  return (
    <CustomerGridItemLayout
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
  return <CustomerGridItemSkeleton imageClassName="h-9 w-9" showCheckbox />;
};

export const CustomerGridItemMobileSkeleton = () => {
  return <CustomerGridItemSkeleton imageClassName="h-11 w-11" />;
};
