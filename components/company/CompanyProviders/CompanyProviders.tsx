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
        <DeleteCompanyProvider>{children}</DeleteCompanyProvider>
      </UpdateCompanyProvider>
    </UpdateCompanyModalProvider>
  );
}
