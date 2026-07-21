import "server-only";

import { CompanyGrid } from "./CompanyGrid";
import { CompanyListItem } from "./CompanyListItem";
import { UpdateCompanyModal } from "./UpdateCompanyModal";
import { DeleteCompanyModal } from "./DeleteCompanyModal";
import { GuestModeModal } from "../common/GuestModeModal";
import { getCompanies } from "@/lib/data/company/company.dal";
import { UpdateCompanyProvider } from "./UpdateCompanyProvider";
import { DeleteCompanyProvider } from "./DeleteCompanyProvider";
import { ModalManagerProvider } from "../../common/ModalManagerContext";

export async function CompaniesContainer() {
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

              <GuestModeModal />
            </DeleteCompanyProvider>
          </UpdateCompanyProvider>
        </ModalManagerProvider>
      ))}
    </CompanyGrid>
  );
}
