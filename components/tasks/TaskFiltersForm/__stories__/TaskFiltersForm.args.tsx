import { mockedUserSummaries } from "@/mocks/users";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";

export const taskFiltersFormArgs = {
  categoryCheckboxGroupItems: mockedTaskCategorySummaries,
  projectCheckboxGroupItems: mockedProjectSummaries,
  assigneeCheckboxGroupItems: mockedUserSummaries,
};
