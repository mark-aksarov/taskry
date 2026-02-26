import {
  ListItem,
  ListItemInfo,
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/components/common/List";

import { CheckboxSkeleton } from "@/components/common/CheckboxSkeleton";
import { ItemBaseActionMenuTriggerSkeleton } from "@/components/common/ItemBase";

export function TaskCategoryListItemSkeleton() {
  return (
    <ListItem className="flex w-full items-center gap-4">
      <CheckboxSkeleton />
      <ListItemInfo>
        <ListItemTitleSkeleton />
        <ListItemTextSkeleton />
      </ListItemInfo>
      <ItemBaseActionMenuTriggerSkeleton />
    </ListItem>
  );
}
