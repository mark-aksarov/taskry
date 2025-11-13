import { ListItem, ListItemInfoSkeleton } from "@/components/common/List";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";

export function UserListItemSkeleton() {
  return (
    <ListItem>
      <ImageContainerSkeleton className="h-9 w-9" />
      <ListItemInfoSkeleton />
      <ListItemInfoSkeleton className="@max-lg:hidden" />
      <ListItemInfoSkeleton className="@max-2xl:hidden" />
      <ListItemInfoSkeleton className="@max-4xl:hidden" />
      <MenuTriggerSkeleton />
    </ListItem>
  );
}
