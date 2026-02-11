import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "./TaskCategoryListItem";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { TaskCategoryItemActionMenuTrigger } from "./TaskCategoryItemActionMenuTrigger";

export async function TaskCategoriesContainer() {
  const taskCategories = await getTaskCategorySummaries();

  return (
    <TaskCategoryList>
      {taskCategories.map((taskCategory) => (
        <TaskCategoryListItem
          key={taskCategory.id}
          id={taskCategory.id}
          name={taskCategory.name}
          menuTrigger={
            <TaskCategoryItemActionMenuTrigger
              guestMode={false}
              taskId={taskCategory.id}
              taskCategoryName={taskCategory.name}
            />
          }
        />
      ))}
    </TaskCategoryList>
  );
}
