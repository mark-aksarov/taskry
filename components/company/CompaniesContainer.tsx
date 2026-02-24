import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { DeleteCompanyModalProvider } from "./DeleteCompanyModal";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <DeleteCompanyModalProvider deleteEntity={deleteCompanies}>
      <CompanyList>
        {companies.map((company) => (
          <CompanyListItem
            key={company.id}
            id={company.id}
            name={company.name}
            guestMode={false}
            updateCompany={updateCompany}
          />
        ))}
      </CompanyList>
    </DeleteCompanyModalProvider>
  );
}
