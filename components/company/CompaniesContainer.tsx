import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { CompanyProviders } from "./CompanyProviders";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <CompanyList>
      {companies.map((company) => (
        <CompanyProviders key={company.id}>
          <CompanyListItem id={company.id} name={company.name} />
        </CompanyProviders>
      ))}
    </CompanyList>
  );
}
