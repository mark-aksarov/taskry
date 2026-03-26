import { DeleteCompanyModalProvider } from "../DeleteCompanyModal";
import { DeleteCompanyProvider } from "../DeleteCompanyProvider";
import { UpdateCompanyModalProvider } from "../UpdateCompanyModal";
import { UpdateCompanyProvider } from "../UpdateCompanyProvider";

interface ProjectItemProvidersProps {
  children: React.ReactNode;
}

export function CompanyProviders({ children }: ProjectItemProvidersProps) {
  return (
    <UpdateCompanyModalProvider>
      <UpdateCompanyProvider>
        <DeleteCompanyModalProvider>
          <DeleteCompanyProvider>{children}</DeleteCompanyProvider>
        </DeleteCompanyModalProvider>
      </UpdateCompanyProvider>
    </UpdateCompanyModalProvider>
  );
}
