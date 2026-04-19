import { GridSkeleton } from "../../common/Grid";
import { TaskCategoryListItemSkeleton } from "../TaskCategoryListItem";

export function TaskCategoryGridSkeleton() {
  return (
    <GridSkeleton
      viewMode="list"
      listItem={<TaskCategoryListItemSkeleton />}
      className="max-md:gap-2!"
    />
  );
}
