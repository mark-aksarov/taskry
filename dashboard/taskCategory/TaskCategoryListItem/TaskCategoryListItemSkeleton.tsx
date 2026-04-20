import {
  ListItem,
  ListItemInfo,
  ListItemTextSkeleton,
  ListItemTitleSkeleton,
} from "@/dashboard/common/ListItem";

import { CheckboxSkeleton } from "@/ui/Skeleton/CheckboxSkeleton";
import { ItemBaseActionMenuTriggerSkeleton } from "@/dashboard/common/ItemBase";

export function TaskCategoryListItemSkeleton() {
  return (
    <ListItem className="flex w-full items-center gap-4">
      <CheckboxSkeleton className="max-md:hidden" />
      <ListItemInfo>
        <ListItemTitleSkeleton />
        <ListItemTextSkeleton />
      </ListItemInfo>
      <ItemBaseActionMenuTriggerSkeleton />
    </ListItem>
  );
}
