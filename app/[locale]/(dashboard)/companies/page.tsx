import { CompaniesPage } from "./CompaniesPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { CompaniesPageEmpty } from "./CompaniesPageEmpty";
import { createCompany } from "@/lib/actions/company/createCompany";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { DeleteCompaniesProvider } from "@/components/company/DeleteCompaniesContext";

export default async function AppCompaniesPage() {
  // Authorization
  const session = await requireProtectedPage();

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  const companies = await getCompanySummaries();

  // Render the empty page if there are no companies
  if (!companies.length) {
    return (
      <CurrentUserProvider value={currentUserContextValue}>
        <CompaniesPageEmpty createCompany={createCompany} />
      </CurrentUserProvider>
    );
  }

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <SelectedItemsProvider pageItems={companies.map((c) => ({ id: c.id }))}>
        <PageTransitionProvider>
          <DeleteCompaniesProvider>
            <CompaniesPage
              companiesContainer={<CompaniesContainer />}
              createCompany={createCompany}
              deleteCompanies={deleteCompanies}
            />
          </DeleteCompaniesProvider>
        </PageTransitionProvider>
      </SelectedItemsProvider>
    </CurrentUserProvider>
  );
}
