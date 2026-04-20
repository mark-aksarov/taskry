import { CompanyGrid } from "../CompanyGrid";
import { CompanyListItem } from "../../CompanyListItem";
import { mockedCompanySummaries } from "@/mocks/companies";
import { MockedUpdateCompanyProvider } from "../../UpdateCompanyProvider/__stories__";
import { MockedDeleteCompanyProvider } from "../../DeleteCompanyProvider/__stories__";

export function CompanyGridExample() {
  return (
    <CompanyGrid>
      {mockedCompanySummaries.map((company) => (
        <MockedUpdateCompanyProvider key={company.id}>
          <MockedDeleteCompanyProvider>
            <CompanyListItem key={company.id} {...company} />
          </MockedDeleteCompanyProvider>
        </MockedUpdateCompanyProvider>
      ))}
    </CompanyGrid>
  );
}
