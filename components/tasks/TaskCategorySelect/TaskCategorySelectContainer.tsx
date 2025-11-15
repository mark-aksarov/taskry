import { getTaskCategories } from "@/lib/queries/task";
import { TaskCategorySelect } from "./TaskCategorySelect";

export async function TaskCategorySelectContainer() {
  const categories = await getTaskCategories(1);

  if (!categories.length) {
    return null;
  }

  return <TaskCategorySelect categories={categories} />;
}
