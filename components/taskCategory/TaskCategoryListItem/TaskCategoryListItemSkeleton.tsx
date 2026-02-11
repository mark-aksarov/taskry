import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ListItem, ListItemInfoSkeleton } from "@/components/common/List";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function TaskCategoryListItemSkeleton() {
  return (
    <ListItem>
      <CheckboxSkeleton />
      <ListItemInfoSkeleton />
      <ItemBaseActionMenuTriggerSkeleton />
    </ListItem>
  );
}
