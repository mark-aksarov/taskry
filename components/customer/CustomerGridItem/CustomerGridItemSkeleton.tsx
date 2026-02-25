import {
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";

import { Skeleton } from "@/components/ui/Skeleton";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CustomerGridItemSkeleton() {
  return (
    <CustomerGridItemLayout
      topRowSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
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
