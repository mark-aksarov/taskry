import { getTaskCategories } from "@/lib/queries/task";
import { TaskCategoryCheckboxGroup } from "./TaskCategoryCheckboxGroup";

export async function TaskCategoryCheckboxGroupContainer() {
  const categories = await getTaskCategories(1);

  if (!categories.length) {
    return null;
  }

  return <TaskCategoryCheckboxGroup categories={categories} />;
}
