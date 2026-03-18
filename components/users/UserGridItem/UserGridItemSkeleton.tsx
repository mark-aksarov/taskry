import {
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/components/common/Grid";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

interface UserGridItemSkeletonProps {
  imageClassName?: string;
}

function UserGridItemSkeleton({ imageClassName }: UserGridItemSkeletonProps) {
  return (
    <UserGridItemLayout
      actionMenuSlot={
        <ItemBaseActionMenuTriggerSkeleton className="-mr-2 ml-auto" />
      }
      imageSlot={<ImageContainerSkeleton className={imageClassName} />}
      titleSlot={<GridItemInfoSkeleton className="flex-auto" />}
      phoneNumberSlot={
        <>
          <Skeleton className="h-px" />
          <GridItemContactListSkeleton />
        </>
      }
    />
  );
}

export const UserGridItemLargeSkeleton = () => {
  return <UserGridItemSkeleton imageClassName="h-9 w-9" />;
};

export const UserGridItemMobileSkeleton = () => {
  return <UserGridItemSkeleton imageClassName="h-11 w-11" />;
};
