import { TasksPage } from "./TasksPage";
import { getTasks } from "@/lib/queries/task";
import { TasksPageEmpty } from "./TasksPageEmpty";
import { UserCheckboxGroupContainer } from "@/components/users/UserCheckboxGroup";
import { CustomerCheckboxGroupContainer } from "@/components/customer/CustomerCheckboxGroup";
import { TaskCategoryCheckboxGroupContainer } from "@/components/tasks/TaskCategoryCheckboxGroup";
import { TaskViewModeContainer } from "@/components/tasks/TaskViewModeContainer/TaskViewModeContainer";
import { TaskCategorySelectContainer } from "@/components/tasks/TaskCategorySelect";
import { ProjectSelectContainer } from "@/components/projects/ProjectSelect";
import { UserSelectContainer } from "@/components/users/UserSelect";

export default async function AppTasksPage() {
  const tasks = await getTasks();

  if (!tasks) return <TasksPageEmpty />;

  return (
    <TasksPage
      TaskCategoryCheckboxGroupContainer={TaskCategoryCheckboxGroupContainer}
      UserCheckboxGroupContainer={UserCheckboxGroupContainer}
      ProjectCheckboxGroupContainer={CustomerCheckboxGroupContainer}
      TaskCategorySelectContainer={TaskCategorySelectContainer}
      ProjectSelectContainer={ProjectSelectContainer}
      UserSelectContainer={UserSelectContainer}
      TaskViewModeContainer={TaskViewModeContainer}
    />
  );
}
