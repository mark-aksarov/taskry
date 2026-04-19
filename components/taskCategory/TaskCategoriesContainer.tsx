import { TaskCategoryGrid } from "./TaskCategoryGrid";
import { TaskCategoryListItem } from "./TaskCategoryListItem";
import { UpdateTaskCategoryModal } from "./UpdateTaskCategoryModal";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { UpdateTaskCategoryProvider } from "./UpdateTaskCategoryProvider";
import { DeleteTaskCategoryProvider } from "./DeleteTaskCategoryProvider";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

export async function TaskCategoriesContainer() {
  const taskCategories = await getTaskCategorySummaries();

  return (
    <TaskCategoryGrid>
      {taskCategories.map((taskCategory) => (
        <ModalManagerProvider key={taskCategory.id}>
          <UpdateTaskCategoryProvider>
            <DeleteTaskCategoryProvider>
              <TaskCategoryListItem
                id={taskCategory.id}
                name={taskCategory.name}
              />

              <UpdateTaskCategoryModal
                taskCategoryId={taskCategory.id}
                taskCategoryName={taskCategory.name}
              />

              <DeleteTaskCategoryModal
                taskCategoryId={taskCategory.id}
                taskCategoryName={taskCategory.name}
              />
            </DeleteTaskCategoryProvider>
          </UpdateTaskCategoryProvider>
        </ModalManagerProvider>
      ))}
    </TaskCategoryGrid>
  );
}
