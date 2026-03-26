import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { CompanyProviders } from "./CompanyProviders";
import { UpdateCompanyModal } from "./UpdateCompanyModal";
import { DeleteCompanyModal } from "./DeleteCompanyModal";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <CompanyList>
      {companies.map((company) => (
        <CompanyProviders key={company.id}>
          <CompanyListItem id={company.id} name={company.name} />

          <UpdateCompanyModal
            companyId={company.id}
            companyName={company.name}
          />

          <DeleteCompanyModal
            companyId={company.id}
            companyName={company.name}
          />
        </CompanyProviders>
      ))}
    </CompanyList>
  );
}
