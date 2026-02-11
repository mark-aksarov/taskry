import { CompaniesPage } from "./CompaniesPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CompaniesPageEmpty } from "./CompaniesPageEmpty";
import { getCompanyCount } from "@/lib/data/company/company.dal";
import { createCompany } from "@/lib/actions/company/createCompany";
import { NewCompanyForm } from "@/components/company/NewCompanyForm";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { CompanyToolbarCreateNewButton } from "@/components/company/CompanyToolbarCreateNewButton";
import { CompanyToolbarActionsMenuTrigger } from "@/components/company/CompanyToolbarActionsMenuTrigger";

export default async function AppCompaniesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const companyCount = await getCompanyCount();
  const guestMode = await hasGuestRole();

  const companyToolbarCreateNewButton = (
    <CompanyToolbarCreateNewButton
      guestMode={guestMode}
      newCompanyForm={<NewCompanyForm createCompany={createCompany} />}
    />
  );

  if (!companyCount) {
    return (
      <CompaniesPageEmpty
        companyToolbarCreateNewButton={companyToolbarCreateNewButton}
      />
    );
  }

  return (
    <CompaniesPage
      companiesContainer={<CompaniesContainer />}
      companyToolbarCreateNewButton={companyToolbarCreateNewButton}
      companyToolbarActionsMenuTrigger={
        <CompanyToolbarActionsMenuTrigger guestMode={guestMode} />
      }
    />
  );
}
