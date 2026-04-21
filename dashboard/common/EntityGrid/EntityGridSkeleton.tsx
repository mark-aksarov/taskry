import { EntityGrid } from "./EntityGrid";
import { Repeat } from "@/common/Repeat";
import { ViewMode } from "../ViewMode";

interface EntityGridSkeletonProps {
  viewMode: ViewMode;
  items?: number;
  listItem?: React.ReactNode;
  gridItemLarge?: React.ReactNode;
  gridItemMobile?: React.ReactNode;
  className?: string;
}

export function EntityGridSkeleton({
  viewMode,
  items = 10,
  listItem,
  gridItemLarge,
  gridItemMobile,
  className,
}: EntityGridSkeletonProps) {
  return (
    <EntityGrid viewMode={viewMode} className={className}>
      <Repeat
        items={items}
        renderItem={() => (
          <div>
            {listItem && (
              <div className={viewMode === "grid" ? "hidden" : ""}>
                {listItem}
              </div>
            )}

            {gridItemLarge && (
              <div className={viewMode === "list" ? "hidden" : ""}>
                {gridItemLarge}
              </div>
            )}

            {gridItemMobile}
          </div>
        )}
      />
    </EntityGrid>
  );
}
