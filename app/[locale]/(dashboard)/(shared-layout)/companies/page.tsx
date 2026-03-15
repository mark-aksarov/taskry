import { CompaniesPage } from "./CompaniesPage";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyContext";
import { DeleteCompaniesProvider } from "@/components/company/DeleteCompaniesContext";

export default async function AppCompaniesPage() {
  await requireProtectedPage();

  const companies = await getCompanySummaries();

  return (
    <SelectedItemsProvider pageItems={companies.map((c) => ({ id: c.id }))}>
      <DeleteCompaniesProvider deleteCompanies={deleteCompanies}>
        <CreateCompanyProvider createCompany={createCompany}>
          <CompaniesPage
            totalCount={companies.length}
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
            companiesContainer={<CompaniesContainer />}
          />
        </CreateCompanyProvider>
      </DeleteCompaniesProvider>
    </SelectedItemsProvider>
  );
}
