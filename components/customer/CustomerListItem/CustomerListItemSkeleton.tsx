import {
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CustomerListItemSkeleton() {
  return (
    <CustomerListItemLayout
      checkboxSlot={<CheckboxSkeleton />}
      imgSlot={<ImageContainerSkeleton className="h-9 w-9 max-md:hidden" />}
      imgMobileSlot={<ImageContainerSkeleton className="h-9 w-9 md:hidden" />}
      infoSlot={
        <>
          <ListItemTitleSkeleton />
          <ListItemTextSkeleton />
        </>
      }
      infoMobileSlot={
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
