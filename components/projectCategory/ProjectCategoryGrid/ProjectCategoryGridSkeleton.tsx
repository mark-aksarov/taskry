import { EntityGridSkeleton } from "../../common/EntityGrid";
import { ProjectCategoryListItemSkeleton } from "../ProjectCategoryListItem";

export function ProjectCategoryGridSkeleton() {
  return (
    <EntityGridSkeleton
      viewMode="list"
      listItem={<ProjectCategoryListItemSkeleton />}
      className="max-md:gap-2!"
    />
  );
}
