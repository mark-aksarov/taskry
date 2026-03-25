import { type Decorator } from "@storybook/react";
import { CreateCompanyModalProvider } from "@/components/company/CreateCompanyModal";
import { CustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext";
import { CreateCustomerModalProvider } from "@/components/customer/CreateCustomerModal";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { MockedCreateCompanyProvider } from "@/components/company/CreateCompanyProvider/__stories__";
import { MockedCreateCustomerProvider } from "@/components/customer/CreateCustomerProvider/__stories__";
import { MockedDeleteCustomersProvider } from "@/components/customer/DeleteCustomersProvider/__stories__";

export const CustomersPageDecorator: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
      <MockedDeleteCustomersProvider>
        <CreateCompanyModalProvider>
          <MockedCreateCompanyProvider>
            <CreateCustomerModalProvider>
              <MockedCreateCustomerProvider>
                <CustomerFiltersProvider filters={{}}>
                  <Story />
                </CustomerFiltersProvider>
              </MockedCreateCustomerProvider>
            </CreateCustomerModalProvider>
          </MockedCreateCompanyProvider>
        </CreateCompanyModalProvider>
      </MockedDeleteCustomersProvider>
    </MockedSelectedItemsProvider>
  );
};
