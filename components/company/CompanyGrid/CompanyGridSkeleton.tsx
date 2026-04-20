import { EntityGridSkeleton } from "../../common/EntityGrid";
import { CompanyListItemSkeleton } from "../CompanyListItem";

export function CompanyGridSkeleton() {
  return (
    <EntityGridSkeleton
      viewMode="list"
      listItem={<CompanyListItemSkeleton />}
      className="max-md:gap-2"
    />
  );
}
