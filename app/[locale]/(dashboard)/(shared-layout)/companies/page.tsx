import { CompaniesPage } from "./CompaniesPage";
import { CompaniesPageProviders } from "./CompaniesPageProviders";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CompaniesContainer } from "@/components/company/CompaniesContainer";
import { CompaniesPageModals } from "./CompaniesPageModals";

export default async function AppCompaniesPage() {
  await requireProtectedPage();

  const companies = await getCompanySummaries();

  return (
    <CompaniesPageProviders pageItems={companies.map((c) => ({ id: c.id }))}>
      <CompaniesPage
        totalCount={companies.length}
        companiesContainer={<CompaniesContainer />}
      />

      <CompaniesPageModals />
    </CompaniesPageProviders>
  );
}
