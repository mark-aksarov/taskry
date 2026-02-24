import { mockedCompanySummaries } from "@/mocks/companies";

export const newCustomerFormArgs = {
  createCustomer: () => ({ status: "success" as const }),
  companySelectItems: mockedCompanySummaries,
};
