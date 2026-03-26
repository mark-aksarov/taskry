import { UpdateCompanyModalProvider } from "../../UpdateCompanyModal";
import { MockedUpdateCompanyProvider } from "../../UpdateCompanyProvider/__stories__";
import { MockedDeleteCompanyProvider } from "../../DeleteCompanyProvider/__stories__";
import { DeleteCompanyModalProvider } from "../../DeleteCompanyModal";

export function MockedCompanyProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateCompanyModalProvider>
      <MockedUpdateCompanyProvider>
        <DeleteCompanyModalProvider>
          <MockedDeleteCompanyProvider>{children}</MockedDeleteCompanyProvider>
        </DeleteCompanyModalProvider>
      </MockedUpdateCompanyProvider>
    </UpdateCompanyModalProvider>
  );
}
