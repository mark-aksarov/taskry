import { CustomerFilters } from "@/lib/types";
import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateCompanyProvider } from "@/components/company/CreateCompanyProvider";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";
import { CreateCustomerProvider } from "@/components/customer/CreateCustomerProvider";
import { DeleteCustomersProvider } from "@/components/customer/DeleteCustomersProvider";
import { CustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext";
import { CreateCustomerModalProvider } from "@/components/customer/CreateCustomerModal";
import { CustomerFiltersModalProvider } from "@/components/customer/CustomerFiltersModal";
import { CustomerCompanyFiltersModalProvider } from "@/components/customer/CustomerCompanyFiltersModal";

interface CustomersPageProvidersProps {
  pageItems: SelectedItem[];
  filters: CustomerFilters;
  children: React.ReactNode;
}

export function CustomersPageProviders({
  pageItems,
  filters,
  children,
}: CustomersPageProvidersProps) {
  return (
    <SelectedItemsProvider pageItems={pageItems}>
      <DeleteCustomersProvider>
        <CreateCompanyModalProvider>
          <CreateCompanyProvider>
            <CreateCustomerModalProvider>
              <CreateCustomerProvider>
                <CustomerFiltersModalProvider>
                  <CustomerCompanyFiltersModalProvider>
                    <CustomerFiltersProvider filters={filters}>
                      {children}
                    </CustomerFiltersProvider>
                  </CustomerCompanyFiltersModalProvider>
                </CustomerFiltersModalProvider>
              </CreateCustomerProvider>
            </CreateCustomerModalProvider>
          </CreateCompanyProvider>
        </CreateCompanyModalProvider>
      </DeleteCustomersProvider>
    </SelectedItemsProvider>
  );
}
