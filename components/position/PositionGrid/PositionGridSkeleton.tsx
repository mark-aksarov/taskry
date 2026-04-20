import { EntityGridSkeleton } from "../../common/EntityGrid";
import { PositionListItemSkeleton } from "../PositionListItem";

export function PositionGridSkeleton() {
  return (
    <EntityGridSkeleton
      viewMode="list"
      listItem={<PositionListItemSkeleton />}
      className="max-md:gap-2"
    />
  );
}
