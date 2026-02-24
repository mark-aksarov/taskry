import { ProjectStatus } from "@/generated/prisma/enums";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { mockedProjectList } from "@/mocks/projects";
import { parseDate } from "@internationalized/date";

const project = mockedProjectList[0];

export const editProjectFormArgs = {
  projectId: project.id,
  projectTitleDefaultValue: project.title,
  projectDeadlineDefaultValue: parseDate(project.deadline),
  projectStatusDefaultValue: ProjectStatus.pending,
  projectCategorySelectDefaultValue: project.category.id.toString(),
  projectCustomerSelectDefaultValue: project.customer.id.toString(),
  projectCategorySelectItems: mockedProjectCategorySummaries,
  projectCustomerSelectItems: mockedCustomerSummaries,
  updateProject: () => ({ status: "success" as const }),
};
