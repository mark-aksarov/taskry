import { CompaniesPage } from "./CompaniesPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CompaniesPageEmpty } from "./CompaniesPageEmpty";
import { getCompanyCount } from "@/lib/data/company/company.dal";
import { createCompany } from "@/lib/actions/company/createCompany";
import { NewCompanyForm } from "@/components/company/NewCompanyForm";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { CompanyToolbarActionsMenuTrigger } from "@/components/company/CompanyToolbarActionsMenuTrigger";
import { CompanyToolbarCreateNewModalTrigger } from "@/components/company/CompanyToolbarCreateNewModalTrigger";

export default async function AppCompaniesPage() {
  // Authorization
  await requireProtectedPage();

  // Get count
  const companyCount = await getCompanyCount();
  const guestMode = await hasGuestRole();

  const companyToolbarCreateNewModalTrigger = (
    <CompanyToolbarCreateNewModalTrigger
      guestMode={guestMode}
      newCompanyForm={<NewCompanyForm createCompany={createCompany} />}
    />
  );

  if (!companyCount) {
    return (
      <CompaniesPageEmpty
        companyToolbarCreateNewModalTrigger={
          companyToolbarCreateNewModalTrigger
        }
      />
    );
  }

  return (
    <CompaniesPage
      companiesContainer={<CompaniesContainer />}
      companyToolbarCreateNewModalTrigger={companyToolbarCreateNewModalTrigger}
      companyToolbarActionsMenuTrigger={
        <CompanyToolbarActionsMenuTrigger
          guestMode={guestMode}
          deleteCompanies={deleteCompanies}
        />
      }
    />
  );
}
