import {
  UserGridItemLargeSkeleton,
  UserGridItemMobileSkeleton,
} from "./UserGridItem";

import { ViewMode } from "../common/ViewMode";
import { UserListItemSkeleton } from "./UserListItem";
import { EntityGridSkeleton } from "../common/EntityGrid";

export function UserGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <EntityGridSkeleton
      viewMode={viewMode}
      listItem={<UserListItemSkeleton />}
      gridItemLarge={<UserGridItemLargeSkeleton />}
      gridItemMobile={<UserGridItemMobileSkeleton />}
    />
  );
}
