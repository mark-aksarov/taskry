import { CompanyGrid } from "../CompanyGrid";
import { CompanyListItem } from "../../CompanyListItem";
import { mockedCompanySummaries } from "@/mocks/companies";
import { DeleteCompanyProvider } from "../../DeleteCompanyContext";
import { UpdateCompanyProvider } from "../../UpdateCompanyContext";
import { ModalManagerProvider } from "@/common/ModalManagerContext";

export function CompanyGridExample() {
  return (
    <CompanyGrid>
      {mockedCompanySummaries.map((company) => (
        <ModalManagerProvider key={company.id}>
          <UpdateCompanyProvider>
            <DeleteCompanyProvider>
              <CompanyListItem {...company} />
            </DeleteCompanyProvider>
          </UpdateCompanyProvider>
        </ModalManagerProvider>
      ))}
    </CompanyGrid>
  );
}
