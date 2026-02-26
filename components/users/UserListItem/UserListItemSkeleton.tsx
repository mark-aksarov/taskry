import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";

import { UserListItemLayout } from "./UserListItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function UserListItemSkeleton() {
  return (
    <UserListItemLayout
      imgSlot={<ImageContainerSkeleton className="h-9 w-9 max-md:hidden" />}
      imgMobileSlot={<ImageContainerSkeleton className="h-9 w-9 md:hidden" />}
      mainSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      mainMobileSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      phoneNumberSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      publicLinkSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      positionSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
}
