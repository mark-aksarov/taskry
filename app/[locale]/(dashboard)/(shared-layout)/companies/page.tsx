import { CompaniesPage } from "./CompaniesPage";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateCompanyModal } from "@/dashboard/company/CreateCompanyModal";
import { CompaniesContainer } from "@/dashboard/company/CompaniesContainer";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { DeleteCompaniesModal } from "@/dashboard/company/DeleteCompaniesModal";
import { CreateCompanyProvider } from "@/dashboard/company/CreateCompanyProvider";
import { DeleteCompaniesProvider } from "@/dashboard/company/DeleteCompaniesProvider";

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
