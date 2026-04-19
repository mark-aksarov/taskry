import {
  CustomerGridItemLargeSkeleton,
  CustomerGridItemMobileSkeleton,
} from "./CustomerGridItem";

import { ViewMode } from "../common/ViewMode";
import { GridSkeleton } from "../common/Grid";
import { CustomerListItemSkeleton } from "./CustomerListItem";

export function CustomerGridSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <GridSkeleton
      viewMode={viewMode}
      listItem={<CustomerListItemSkeleton />}
      gridItemLarge={<CustomerGridItemLargeSkeleton />}
      gridItemMobile={<CustomerGridItemMobileSkeleton />}
    />
  );
}
