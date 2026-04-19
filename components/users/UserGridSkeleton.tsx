import {
  UserGridItemLargeSkeleton,
  UserGridItemMobileSkeleton,
} from "./UserGridItem";

import { ViewMode } from "../common/ViewMode";
import { GridSkeleton } from "../common/Grid";
import { UserListItemSkeleton } from "./UserListItem";

export function UserGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <GridSkeleton
      viewMode={viewMode}
      listItem={<UserListItemSkeleton />}
      gridItemLarge={<UserGridItemLargeSkeleton />}
      gridItemMobile={<UserGridItemMobileSkeleton />}
    />
  );
}
