import { TaskCategorySummaryDTO } from "./taskCategory.dto";
import { TaskCategorySummaryType } from "./taskCategory.select";

export const mapTaskCategorySummaryToDTO = (
  category: TaskCategorySummaryType,
): TaskCategorySummaryDTO => ({
  id: category.id,
  name: category.name,
});
