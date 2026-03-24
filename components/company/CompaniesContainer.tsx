import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { UpdateCompanyProvider } from "./UpdateCompanyContext";
import { DeleteCompanyProvider } from "./DeleteCompanyProvider";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <CompanyList>
      {companies.map((company) => (
        <UpdateCompanyProvider updateCompany={updateCompany}>
          <DeleteCompanyProvider>
            <CompanyListItem
              key={company.id}
              id={company.id}
              name={company.name}
            />
          </DeleteCompanyProvider>
        </UpdateCompanyProvider>
      ))}
    </CompanyList>
  );
}
