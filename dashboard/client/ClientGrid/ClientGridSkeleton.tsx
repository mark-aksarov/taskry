import {
  ClientGridItemLargeSkeleton,
  ClientGridItemMobileSkeleton,
} from "../ClientGridItem";

import { ViewMode } from "../../common/ViewMode";
import { EntityGridSkeleton } from "../../common/EntityGrid";
import { ClientListItemSkeleton } from "../ClientListItem";

export function ClientGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <EntityGridSkeleton
      viewMode={viewMode}
      listItem={<ClientListItemSkeleton />}
      gridItemLarge={<ClientGridItemLargeSkeleton />}
      gridItemMobile={<ClientGridItemMobileSkeleton />}
    />
  );
}
