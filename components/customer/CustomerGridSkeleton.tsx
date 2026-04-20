import {
  CustomerGridItemLargeSkeleton,
  CustomerGridItemMobileSkeleton,
} from "./CustomerGridItem";

import { ViewMode } from "../common/ViewMode";
import { EntityGridSkeleton } from "../common/EntityGrid";
import { CustomerListItemSkeleton } from "./CustomerListItem";

export function CustomerGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <EntityGridSkeleton
      viewMode={viewMode}
      listItem={<CustomerListItemSkeleton />}
      gridItemLarge={<CustomerGridItemLargeSkeleton />}
      gridItemMobile={<CustomerGridItemMobileSkeleton />}
    />
  );
}
