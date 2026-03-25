import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyProvider";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";
import { DeleteCompaniesProvider } from "@/components/company/DeleteCompaniesProvider";

interface CompaniesPageProvidersProps {
  pageItems: SelectedItem[];
  children: React.ReactNode;
}

export function CompaniesPageProviders({
  pageItems,
  children,
}: CompaniesPageProvidersProps) {
  return (
    <SelectedItemsProvider pageItems={pageItems}>
      <DeleteCompaniesProvider>
        <CreateCompanyModalProvider>
          <CreateCompanyProvider>{children}</CreateCompanyProvider>
        </CreateCompanyModalProvider>
      </DeleteCompaniesProvider>
    </SelectedItemsProvider>
  );
}
