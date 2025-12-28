import { getAllTaskCategories } from "./taskCategory.dal";
import { TaskCategorySummaryDTO } from "./taskCategory.dto";

export const getTaskCategorySummaries = async (): Promise<
  TaskCategorySummaryDTO[]
> => {
  const taskCategories = await getAllTaskCategories();

  return taskCategories.map((p) => {
    return {
      id: p.id,
      name: p.name,
    };
  });
};
