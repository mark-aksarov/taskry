import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ListItem, ListItemInfoSkeleton } from "@/components/common/List";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function CustomerListItemSkeleton() {
  return (
    <ListItem>
      <CheckboxSkeleton />
      <ImageContainerSkeleton className="h-9 w-9" />
      <ListItemInfoSkeleton />
      <ListItemInfoSkeleton className="@max-lg:hidden" />
      <ListItemInfoSkeleton className="@max-2xl:hidden" />
      <ListItemInfoSkeleton className="@max-4xl:hidden" />
      <ItemBaseActionMenuTriggerSkeleton />
    </ListItem>
  );
}
