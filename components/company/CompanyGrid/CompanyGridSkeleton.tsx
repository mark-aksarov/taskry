import { GridSkeleton } from "../../common/Grid";
import { CompanyListItemSkeleton } from "../CompanyListItem";

export function CompanyGridSkeleton() {
  return (
    <GridSkeleton
      viewMode="list"
      listItem={<CompanyListItemSkeleton />}
      className="max-md:gap-2"
    />
  );
}
