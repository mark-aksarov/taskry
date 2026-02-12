import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "./TaskCategoryListItem";
import { EditTaskCategoryForm } from "./EditTaskCategoryForm";
import { updateTaskCategory } from "@/lib/actions/taskCategory/updateTaskCategory";
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
              taskCategoryId={taskCategory.id}
              taskCategoryName={taskCategory.name}
              editTaskCategoryForm={
                <EditTaskCategoryForm
                  taskCategoryId={taskCategory.id}
                  nameDefaultValue={taskCategory.name}
                  updateTaskCategory={updateTaskCategory}
                />
              }
            />
          }
        />
      ))}
    </TaskCategoryList>
  );
}
