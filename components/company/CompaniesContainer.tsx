import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { UpdateCompanyProvider } from "./UpdateCompanyProvider";
import { DeleteCompanyProvider } from "./DeleteCompanyContext/DeleteCompanyProvider";
import { UpdateCompanyModalProvider } from "./UpdateCompanyModal";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export async function CompaniesContainer() {
  const companies = await getCompanySummaries();

  return (
    <CompanyList>
      {companies.map((company) => (
        <UpdateCompanyModalProvider key={company.id}>
          <UpdateCompanyProvider>
            <DeleteCompanyProvider>
              <CompanyListItem id={company.id} name={company.name} />
            </DeleteCompanyProvider>
          </UpdateCompanyProvider>
        </UpdateCompanyModalProvider>
      ))}
    </CompanyList>
  );
}
