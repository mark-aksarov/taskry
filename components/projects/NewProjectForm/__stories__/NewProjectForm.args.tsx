import { mockedCustomerSummaries } from "@/mocks/customers";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";

export const newProjectFormArgs = {
  projectCategorySelectItems: mockedProjectCategorySummaries,
  projectCustomerSelectItems: mockedCustomerSummaries,
  createProject: () => ({ status: "success" as const }),
};
