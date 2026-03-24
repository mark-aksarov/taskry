import { CompaniesPage } from "./CompaniesPage";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyProvider";
import { DeleteCompaniesProvider } from "@/components/company/DeleteCompaniesProvider";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";

export default async function AppCompaniesPage() {
  await requireProtectedPage();

  const companies = await getCompanySummaries();

  return (
    <SelectedItemsProvider pageItems={companies.map((c) => ({ id: c.id }))}>
      <DeleteCompaniesProvider>
        <CreateCompanyModalProvider>
          <CreateCompanyProvider>
            <CompaniesPage
              totalCount={companies.length}
              searchContainer={<LinkSearchContainer pathname="/tasks" />}
              companiesContainer={<CompaniesContainer />}
            />
          </CreateCompanyProvider>
        </CreateCompanyModalProvider>
      </DeleteCompaniesProvider>
    </SelectedItemsProvider>
  );
}
