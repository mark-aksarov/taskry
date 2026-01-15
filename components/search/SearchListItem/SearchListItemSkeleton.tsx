import { ListItem, ListItemInfoSkeleton } from "@/components/common/List";
import { ImageContainerSkeleton } from "@/components/common/ImageContainer";

export function SearchListItemSkeleton() {
  return (
    <ListItem className="rounded-none pr-3 shadow-none">
      <ImageContainerSkeleton className="h-9 w-9" />
      <ListItemInfoSkeleton />
    </ListItem>
  );
}
