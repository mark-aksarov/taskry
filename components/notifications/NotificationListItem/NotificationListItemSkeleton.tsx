import { Skeleton } from "@/components/ui";
import { notificationListItemStyles } from "./NotificationListItem";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { NotificationListItemInfoSkeleton } from "./NotificationListItemInfo";

export const NotificationListItemSkeleton = () => {
  return (
    <div className={notificationListItemStyles}>
      <ImageContainerSkeleton className="h-10 w-10" />

      <NotificationListItemInfoSkeleton />

      <div className="ml-auto flex h-8 w-8 items-center justify-center">
        <Skeleton className="h-1 w-4" />
      </div>
    </div>
  );
};
