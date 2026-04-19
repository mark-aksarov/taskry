import {
  GridItemInfoSkeleton,
  GridItemContactListSkeleton,
} from "@/components/common/GridItem";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

interface UserGridItemSkeletonProps {
  imageClassName?: string;
  className?: string;
}

function UserGridItemSkeleton({
  imageClassName,
  className,
}: UserGridItemSkeletonProps) {
  return (
    <UserGridItemLayout
      className={className}
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
  return (
    <UserGridItemSkeleton className="max-md:hidden" imageClassName="h-9 w-9" />
  );
};

export const UserGridItemMobileSkeleton = () => {
  return (
    <UserGridItemSkeleton className="md:hidden" imageClassName="h-11 w-11" />
  );
};
