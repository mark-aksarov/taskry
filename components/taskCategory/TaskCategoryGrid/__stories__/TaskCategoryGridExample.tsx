import { TaskCategoryGrid } from "../TaskCategoryGrid";
import { TaskCategoryListItem } from "../../TaskCategoryListItem";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { MockedUpdateTaskCategoryProvider } from "../../UpdateTaskCategoryProvider/__stories__";
import { MockedDeleteTaskCategoryProvider } from "../../DeleteTaskCategoryProvider/__stories__";

export function TaskCategoryGridExample() {
  return (
    <TaskCategoryGrid>
      {mockedTaskCategorySummaries.map((taskCategory) => (
        <MockedUpdateTaskCategoryProvider key={taskCategory.id}>
          <MockedDeleteTaskCategoryProvider>
            <TaskCategoryListItem {...taskCategory} />
          </MockedDeleteTaskCategoryProvider>
        </MockedUpdateTaskCategoryProvider>
      ))}
    </TaskCategoryGrid>
  );
}
