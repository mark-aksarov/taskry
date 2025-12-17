import { getCompanySummaries } from "@/lib/dal/companies";
import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../CustomerFiltersForm";

export async function CustomerFiltersFormServerContainer() {
  const companies = await getCompanySummaries();

  return (
    <CustomerFiltersForm
      companyCheckboxGroup={
        <CustomerFiltersFormCompanyCheckboxGroup companies={companies} />
      }
    />
  );
}
