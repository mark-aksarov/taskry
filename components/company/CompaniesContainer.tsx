import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { CompanyItemActionMenuTrigger } from "./CompanyItemActionMenuTrigger";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <CompanyList>
      {companies.map((company) => (
        <CompanyListItem
          key={company.id}
          id={company.id}
          name={company.name}
          menuTrigger={
            <CompanyItemActionMenuTrigger
              guestMode={false}
              companyId={company.id}
              companyName={company.name}
            />
          }
        />
      ))}
    </CompanyList>
  );
}
