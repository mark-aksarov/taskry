import { CustomerFilters } from "@/lib/types";
import { CustomerFiltersForm } from "./CustomerFiltersForm";
import { getCompanySummaries } from "@/lib/data/company/company.service";
import { CustomerFiltersFormCompanyCheckboxGroup } from "./CustomerFiltersForm";

interface CustomerFiltersFormContainerProps {
  filters: CustomerFilters;
}

export async function CustomerFiltersFormContainer({
  filters,
}: CustomerFiltersFormContainerProps) {
  const companies = await getCompanySummaries();

  return (
    <CustomerFiltersForm
      filters={filters}
      companyCheckboxGroup={
        <CustomerFiltersFormCompanyCheckboxGroup
          filters={filters}
          companies={companies}
        />
      }
    />
  );
}
