import "server-only";

import { CompanyGrid } from "./CompanyGrid";
import { CompanyListItem } from "./CompanyListItem";
import { UpdateCompanyModal } from "./UpdateCompanyModal";
import { DeleteCompanyModal } from "./DeleteCompanyModal";
import { getCompanies } from "@/lib/data/company/company.dal";
import { UpdateCompanyProvider } from "./UpdateCompanyContext";
import { DeleteCompanyProvider } from "./DeleteCompanyContext";
import { ModalManagerProvider } from "../../common/ModalManagerContext";

export async function CompaniesGridContainer() {
  const companies = await getCompanies();

  return (
    <CompanyGrid>
      {companies.map((company) => (
        <ModalManagerProvider key={company.id}>
          <UpdateCompanyProvider>
            <DeleteCompanyProvider>
              <CompanyListItem id={company.id} name={company.name} />

              <UpdateCompanyModal
                companyId={company.id}
                companyName={company.name}
              />

              <DeleteCompanyModal
                companyId={company.id}
                companyName={company.name}
              />
            </DeleteCompanyProvider>
          </UpdateCompanyProvider>
        </ModalManagerProvider>
      ))}
    </CompanyGrid>
  );
}
