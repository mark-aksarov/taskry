import { mockedUserSummaries } from "@/mocks/users";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";

export const projectFiltersFormArgs = {
  categoryCheckboxGroupItems: mockedProjectCategorySummaries,
  userCheckboxGroupItems: mockedUserSummaries,
  customerCheckboxGroupItems: mockedCustomerSummaries,
};
