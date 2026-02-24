import { TaskCategoryList } from "./TaskCategoryList";
import { TaskCategoryListItem } from "./TaskCategoryListItem";
import { DeleteTaskCategoryModalProvider } from "./DeleteTaskCategoryModal";
import { updateTaskCategory } from "@/lib/actions/taskCategory/updateTaskCategory";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";

export async function TaskCategoriesContainer() {
  const taskCategories = await getTaskCategorySummaries();

  return (
    <DeleteTaskCategoryModalProvider deleteEntity={deleteTaskCategories}>
      <TaskCategoryList>
        {taskCategories.map((taskCategory) => (
          <TaskCategoryListItem
            key={taskCategory.id}
            id={taskCategory.id}
            name={taskCategory.name}
            guestMode={false}
            updateTaskCategory={updateTaskCategory}
          />
        ))}
      </TaskCategoryList>
    </DeleteTaskCategoryModalProvider>
  );
}
