import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { mockedTaskDetail } from "@/mocks/tasks";
import { mockedUserSummaries } from "@/mocks/users";
import { parseDate } from "@internationalized/date";

const task = mockedTaskDetail;

export const editTaskFormArgs = {
  taskId: task.id,
  taskTitleDefaultValue: task.title,
  taskDescriptionDefaultValue: task.description,
  taskDeadlineDefaultValue: parseDate(task.deadline),
  taskStatusSelectDefaultValue: task.status,
  taskCategorySelectDefaultValue: task.category.id.toString(),
  taskProjectSelectDefaultValue: task.project.id.toString(),
  taskAssigneeSelectDefaultValue: task.assignee.id,
  taskCategorySelectItems: mockedTaskCategorySummaries,
  taskProjectSelectItems: mockedProjectSummaries,
  taskAssigneeSelectItems: mockedUserSummaries,
  updateTask: () => ({ status: "success" as const }),
  mutate: () => {},
};
