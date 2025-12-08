import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { getCompanySummaries } from "@/lib/queries/companies";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../CustomerFiltersForm";

export async function CustomerFiltersFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const companies = await getCompanySummaries(workspaceId);

  return (
    <CustomerFiltersForm
      companyCheckboxGroup={
        <CustomerFiltersFormCompanyCheckboxGroup companies={companies} />
      }
    />
  );
}
