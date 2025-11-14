import { TasksPage } from "./TasksPage";
import { getTasks } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { UserCheckboxGroupContainer } from "@/components/users/UserCheckboxGroup";
import { CustomerCheckboxGroupContainer } from "@/components/customer/CustomerCheckboxGroup";
import { TaskCategoryCheckboxGroupContainer } from "@/components/tasks/TaskCategoryCheckboxGroup";
import { TaskViewModeContainer } from "@/components/tasks/TaskViewModeContainer";
import { TaskCategorySelectContainer } from "@/components/tasks/TaskCategorySelect";
import { ProjectSelectContainer } from "@/components/projects/ProjectSelect";
import { UserSelectContainer } from "@/components/users/UserSelect";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { TaskStatusSelectContainer } from "@/components/tasks/TaskStatusSelect/TaskStatusSelectContainer";
import { TaskStatusCheckboxGroupContainer } from "@/components/tasks/TaskStatusCheckboxGroup/TaskStatusCheckboxGroupContainer";

export default async function AppTasksPage() {
  const tasks = await getTasks();

  if (!tasks) return <TasksPageEmpty />;

  return (
    <TaskDetailContainerProvider>
      <CommentsContainerProvider>
        <TasksPage
          TaskStatusCheckboxGroupContainer={TaskStatusCheckboxGroupContainer}
          TaskCategoryCheckboxGroupContainer={
            TaskCategoryCheckboxGroupContainer
          }
          UserCheckboxGroupContainer={UserCheckboxGroupContainer}
          ProjectCheckboxGroupContainer={CustomerCheckboxGroupContainer}
          TaskStatusSelectContainer={TaskStatusSelectContainer}
          TaskCategorySelectContainer={TaskCategorySelectContainer}
          ProjectSelectContainer={ProjectSelectContainer}
          UserSelectContainer={UserSelectContainer}
          TaskViewModeContainer={TaskViewModeContainer}
        />
      </CommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
