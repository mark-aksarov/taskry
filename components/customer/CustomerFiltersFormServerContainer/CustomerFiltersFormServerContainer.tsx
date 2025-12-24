import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { CustomerFilters } from "@/lib/data/customer/customer.dto";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
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
