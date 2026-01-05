import {
  TaskFormBaseStatusSelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
} from "../TaskFormBase";

import { NewTaskForm } from "../NewTaskForm";

import { createTask } from "@/lib/actions/task/createTask";
import { getUserSummaries } from "@/lib/data/user/user.service";
import { getProjectSummaries } from "@/lib/data/project/project.service";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.service";

export async function NewTaskFormContainer() {
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
