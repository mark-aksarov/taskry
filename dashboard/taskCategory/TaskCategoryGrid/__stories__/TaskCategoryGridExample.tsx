import { TaskCategoryGrid } from "../TaskCategoryGrid";
import { TaskCategoryListItem } from "../../TaskCategoryListItem";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { UpdateTaskCategoryProvider } from "../../UpdateTaskCategoryContext";
import { DeleteTaskCategoryProvider } from "../../DeleteTaskCategoryContext";

export function TaskCategoryGridExample() {
  return (
    <TaskCategoryGrid>
      {mockedTaskCategorySummaries.map((taskCategory) => (
        <UpdateTaskCategoryProvider key={taskCategory.id}>
          <DeleteTaskCategoryProvider>
            <TaskCategoryListItem {...taskCategory} />
          </DeleteTaskCategoryProvider>
        </UpdateTaskCategoryProvider>
      ))}
    </TaskCategoryGrid>
  );
}
