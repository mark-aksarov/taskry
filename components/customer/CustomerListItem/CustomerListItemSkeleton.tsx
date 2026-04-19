import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/ListItem";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { CheckboxSkeleton } from "@/components/ui/Skeleton/CheckboxSkeleton";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CustomerListItemSkeleton() {
  return (
    <CustomerListItemLayout
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
