import { CompaniesPage } from "./CompaniesPage";
import { getCompanies } from "@/lib/data/company/company.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { CompaniesGridContainer } from "@/dashboard/company/CompaniesGridContainer";

export default async function AppCompaniesPage() {
  await requireFullAccess();

  const companies = await getCompanies();

  return (
    <CompaniesPage
      totalCount={companies.length}
      selectedItems={companies.map((c) => ({ id: c.id }))}
      companiesContainer={<CompaniesGridContainer />}
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
