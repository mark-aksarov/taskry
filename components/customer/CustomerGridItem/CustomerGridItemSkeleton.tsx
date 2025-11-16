import {
  GridItemContactListSkeleton,
  GridItemInfoSkeleton,
} from "@/components/common/Grid";
import { Skeleton } from "@/components/ui";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CustomerGridItemSkeleton() {
  return (
    <CustomerGridItemLayout
      topRowSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      imageSlot={<ImageContainerSkeleton className="h-20 w-20" />}
      titleSlot={<GridItemInfoSkeleton className="w-full items-center" />}
      contactSlot={
        <>
          <Skeleton className="h-px" />
          <GridItemContactListSkeleton />
        </>
      }
    />
  );
}
