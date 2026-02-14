import { CompanyList } from "./CompanyList";
import { CompanyListItem } from "./CompanyListItem";
import { EditCompanyForm } from "./EditCompanyForm";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
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
              deleteCompanies={deleteCompanies}
              editCompanyForm={
                <EditCompanyForm
                  companyId={company.id}
                  nameDefaultValue={company.name}
                  updateCompany={updateCompany}
                />
              }
            />
          }
        />
      ))}
    </CompanyList>
  );
}
