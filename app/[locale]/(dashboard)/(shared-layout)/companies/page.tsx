import { CompaniesPage } from "./CompaniesPage";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateCompanyModal } from "@/components/company/CreateCompanyModal";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { DeleteCompaniesModal } from "@/components/company/DeleteCompaniesModal";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyProvider";
import { DeleteCompaniesProvider } from "@/components/company/DeleteCompaniesProvider";

export default async function AppCompaniesPage() {
  await requireProtectedPage();

  const companies = await getCompanySummaries();

  return (
    <SelectedItemsProvider pageItems={companies.map((c) => ({ id: c.id }))}>
      <DeleteCompaniesProvider>
        <CreateCompanyProvider>
          <CompaniesPage
            totalCount={companies.length}
            companiesContainer={<CompaniesContainer />}
          />

          <TaskSearchModal
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
          />
          <CreateCompanyModal />
          <DeleteCompaniesModal />
        </CreateCompanyProvider>
      </DeleteCompaniesProvider>
    </SelectedItemsProvider>
  );
}
