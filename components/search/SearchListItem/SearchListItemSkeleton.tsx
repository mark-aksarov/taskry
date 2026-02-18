import { ListItem, ListItemInfoSkeleton } from "@/components/common/List";

export function SearchListItemSkeleton() {
  return (
    <ListItem className="rounded-none pr-3 shadow-none">
      <ListItemInfoSkeleton />
    </ListItem>
  );
}
