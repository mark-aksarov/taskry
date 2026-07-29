import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/dashboard/common/ListItem";
import { CheckboxSkeleton } from "@/ui/Skeleton";
import { ClientListItemLayout } from "./ClientListItemLayout";
import { ImageContainerSkeleton } from "@/dashboard/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/dashboard/common/ItemBase";

export function ClientListItemSkeleton() {
  return (
    <ClientListItemLayout
      className="max-md:hidden"
      checkboxSlot={<CheckboxSkeleton />}
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
      companySlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      menuTriggerSlot={<ItemBaseActionMenuTriggerSkeleton />}
    />
  );
}
