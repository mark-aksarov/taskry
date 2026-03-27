import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "./TaskCategoryListItem";
import { TaskCategoryProviders } from "./TaskCategoryProviders";
import { UpdateTaskCategoryModal } from "./UpdateTaskCategoryModal";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

export async function TaskCategoriesContainer() {
  const taskCategories = await getTaskCategorySummaries();

  return (
    <TaskCategoryList>
      {taskCategories.map((taskCategory) => (
        <TaskCategoryProviders key={taskCategory.id}>
          <TaskCategoryListItem id={taskCategory.id} name={taskCategory.name} />

          <UpdateTaskCategoryModal
            taskCategoryId={taskCategory.id}
            taskCategoryName={taskCategory.name}
          />

          <DeleteTaskCategoryModal
            taskCategoryId={taskCategory.id}
            taskCategoryName={taskCategory.name}
          />
        </TaskCategoryProviders>
      ))}
    </TaskCategoryList>
  );
}
