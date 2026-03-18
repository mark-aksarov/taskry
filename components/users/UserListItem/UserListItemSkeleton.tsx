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
      imgSlot={<ImageContainerSkeleton className="h-9 w-9" />}
      mainSlot={
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
