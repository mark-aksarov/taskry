import { type Decorator } from "@storybook/react";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";
import { CustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext";
import { CreateCustomerModalProvider } from "@/components/customer/CreateCustomerModal";
import { CustomerFiltersModalProvider } from "@/components/customer/CustomerFiltersModal";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { MockedCreateCompanyProvider } from "@/components/company/CreateCompanyProvider/__stories__";
import { CustomerCompanyFiltersModalProvider } from "@/components/customer/CustomerCompanyFiltersModal";
import { MockedCreateCustomerProvider } from "@/components/customer/CreateCustomerProvider/__stories__";
import { MockedDeleteCustomersProvider } from "@/components/customer/DeleteCustomersProvider/__stories__";

export const withCustomersPageProviders: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
      <MockedDeleteCustomersProvider>
        <CreateCompanyModalProvider>
          <MockedCreateCompanyProvider>
            <CreateCustomerModalProvider>
              <MockedCreateCustomerProvider>
                <CustomerFiltersModalProvider>
                  <CustomerCompanyFiltersModalProvider>
                    <CustomerFiltersProvider filters={{}}>
                      <Story />
                    </CustomerFiltersProvider>
                  </CustomerCompanyFiltersModalProvider>
                </CustomerFiltersModalProvider>
              </MockedCreateCustomerProvider>
            </CreateCustomerModalProvider>
          </MockedCreateCompanyProvider>
        </CreateCompanyModalProvider>
      </MockedDeleteCustomersProvider>
    </MockedSelectedItemsProvider>
  );
};
