import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerFiltersModal } from "../CustomerFiltersModal";
import { CustomerFiltersForm } from "../../CustomerFiltersForm";

export function MockedCustomerFiltersModal() {
  return (
    <CustomerFiltersModal
      filtersFormContainer={
        <CustomerFiltersForm
          companyCheckboxGroupItems={mockedCompanySummaries}
        />
      }
    />
  );
}
