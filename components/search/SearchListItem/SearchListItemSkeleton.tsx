import {
  ListItem,
  ListItemInfo,
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";

export function SearchListItemSkeleton() {
  return (
    <ListItem className="rounded-none pr-3 shadow-none">
      <ListItemInfo>
        <ListItemTitleSkeleton />
        <ListItemTextSkeleton />
      </ListItemInfo>
    </ListItem>
  );
}
