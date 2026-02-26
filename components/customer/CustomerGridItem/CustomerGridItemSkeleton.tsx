import {
  GridItemRow,
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";

import { Skeleton } from "@/components/ui/Skeleton";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CustomerGridItemSkeleton() {
  return (
    <CustomerGridItemLayout
      topRowSlot={
        <GridItemRow>
          <CheckboxSkeleton />
          <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
        </GridItemRow>
      }
      imageSlot={<ImageContainerSkeleton className="h-9 w-9" />}
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
