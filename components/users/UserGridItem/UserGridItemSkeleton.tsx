import {
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";
import { Skeleton } from "@/components/ui";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function UserGridItemSkeleton() {
  return (
    <UserGridItemLayout
      actionMenuSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      imageSlot={<ImageContainerSkeleton className="h-20 w-20" />}
      titleSlot={<GridItemInfoSkeleton className="w-full items-center" />}
      phoneNumberSlot={
        <>
          <Skeleton className="h-px" />
          <GridItemContactListSkeleton />
        </>
      }
    />
  );
}
