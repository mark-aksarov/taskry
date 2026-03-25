import { UpdateCompanyModalProvider } from "../../UpdateCompanyModal";
import { MockedUpdateCompanyProvider } from "../../UpdateCompanyProvider/__stories__";
import { MockedDeleteCompanyProvider } from "../../DeleteCompanyProvider/__stories__";

export function MockedCompanyProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateCompanyModalProvider>
      <MockedUpdateCompanyProvider>
        <MockedDeleteCompanyProvider>{children}</MockedDeleteCompanyProvider>
      </MockedUpdateCompanyProvider>
    </UpdateCompanyModalProvider>
  );
}
