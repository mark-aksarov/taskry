import { notificationListItemStyles } from "./NotificationListItem";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { NotificationListItemInfoSkeleton } from "./NotificationListItemInfo";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export const NotificationListItemSkeleton = () => {
  return (
    <div className={notificationListItemStyles}>
      <ImageContainerSkeleton className="h-10 w-10" />
      <NotificationListItemInfoSkeleton />
      <ItemBaseActionMenuTriggerSkeleton />
    </div>
  );
};
