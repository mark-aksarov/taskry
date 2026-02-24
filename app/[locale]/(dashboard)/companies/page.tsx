import {
  getCompanyCount,
  getCompanySummaries,
} from "@/lib/data/company/company.dal";

import { CompaniesPage } from "./CompaniesPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CompaniesPageEmpty } from "./CompaniesPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";

export default async function AppCompaniesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const companyCount = await getCompanyCount();
  const guestMode = await hasGuestRole();

  if (!companyCount) {
    return (
      <CompaniesPageEmpty guestMode={guestMode} createCompany={createCompany} />
    );
  }

  const companies = await getCompanySummaries();

  return (
    <SelectedItemsProvider pageItems={companies.map((c) => ({ id: c.id }))}>
      <PageTransitionProvider>
        <CompaniesPage
          companiesContainer={<CompaniesContainer />}
          guestMode={guestMode}
          createCompany={createCompany}
          deleteCompanies={deleteCompanies}
        />
      </PageTransitionProvider>
    </SelectedItemsProvider>
  );
}
