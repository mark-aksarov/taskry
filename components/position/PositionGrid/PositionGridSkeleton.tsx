import { GridSkeleton } from "../../common/Grid";
import { PositionListItemSkeleton } from "../PositionListItem";

export function PositionGridSkeleton() {
  return (
    <GridSkeleton
      viewMode="list"
      listItem={<PositionListItemSkeleton />}
      className="max-md:gap-2"
    />
  );
}
