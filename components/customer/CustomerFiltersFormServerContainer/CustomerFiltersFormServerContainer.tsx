import { CustomerFilters } from "@/lib/types";
import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { getCompanySummaries } from "@/lib/data/company/company.service";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../CustomerFiltersForm";

interface CustomerFiltersFormServerContainerProps {
  filters: CustomerFilters;
}

export async function CustomerFiltersFormServerContainer({
  filters,
}: CustomerFiltersFormServerContainerProps) {
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
