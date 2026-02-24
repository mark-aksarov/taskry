import { mockedUserSummaries } from "@/mocks/users";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";

export const newTaskFormArgs = {
  categorySelectItems: mockedTaskCategorySummaries,
  projectSelectItems: mockedProjectSummaries,
  assigneeSelectItems: mockedUserSummaries,
  createTask: () => ({ status: "success" as const }),
};
