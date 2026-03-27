import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerCompanyFiltersModal } from "../CustomerCompanyFiltersModal";
import { CustomerCompanyFiltersForm } from "../../CustomerCompanyFiltersForm";

export function MockedCustomerCompanyFiltersModal() {
  return (
    <CustomerCompanyFiltersModal
      filtersFormContainer={
        <CustomerCompanyFiltersForm
          companyCheckboxGroupItems={mockedCompanySummaries}
        />
      }
    />
  );
}
