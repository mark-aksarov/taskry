import { EntityGridSkeleton } from "../../common/EntityGrid";
import { TaskCategoryListItemSkeleton } from "../TaskCategoryListItem";

export function TaskCategoryGridSkeleton() {
  return (
    <EntityGridSkeleton
      viewMode="list"
      listItem={<TaskCategoryListItemSkeleton />}
      className="max-md:gap-2!"
    />
  );
}
