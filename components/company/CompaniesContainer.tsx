import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { deleteCompany } from "@/lib/actions/company/deleteCompany";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <CompanyList>
      {companies.map((company) => (
        <CompanyListItem
          key={company.id}
          id={company.id}
          name={company.name}
          updateCompany={updateCompany}
          deleteCompany={deleteCompany}
        />
      ))}
    </CompanyList>
  );
}
