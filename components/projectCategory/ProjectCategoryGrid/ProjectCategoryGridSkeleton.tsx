import { GridSkeleton } from "../../common/Grid";
import { ProjectCategoryListItemSkeleton } from "../ProjectCategoryListItem";

export function ProjectCategoryGridSkeleton() {
  return (
    <GridSkeleton
      viewMode="list"
      listItem={<ProjectCategoryListItemSkeleton />}
      className="max-md:gap-2!"
    />
  );
}
