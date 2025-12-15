import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { getCompanySummaries } from "@/lib/queries/companies";
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
