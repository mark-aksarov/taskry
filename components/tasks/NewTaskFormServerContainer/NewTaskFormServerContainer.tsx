import {
  TaskFormBaseStatusSelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
} from "../TaskFormBase";

import { NewTaskForm } from "../NewTaskForm";
import { getUserSummaries } from "@/lib/dal/user";
import { createTask } from "@/lib/actions/createTask";
import { getProjectSummaries } from "@/lib/dal/project";
import { getTaskCategorySummaries } from "@/lib/dal/task";

export async function NewTaskFormServerContainer() {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <NewTaskForm
      taskStatusSelect={<TaskFormBaseStatusSelect />}
      taskCategorySelect={
        <TaskFormBaseCategorySelect categories={categories} />
      }
      projectSelect={<TaskFormBaseProjectSelect projects={projects} />}
      assigneeSelect={<TaskFormBaseAssigneeSelect users={users} />}
      formAction={createTask}
    />
  );
}
