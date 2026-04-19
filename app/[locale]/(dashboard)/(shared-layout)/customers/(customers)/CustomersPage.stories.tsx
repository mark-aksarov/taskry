import {
  CustomerGridItemLarge,
  CustomerGridItemMobile,
} from "@/components/customer/CustomerGridItem";

import {
  CustomerGridItemLargeStory,
  CustomerGridItemMobileStory,
} from "@/components/customer/CustomerGridItem/__stories__";

import { mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CustomersPage } from "./CustomersPage";
import { mockedCustomerList } from "@/mocks/customers";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerListItem } from "@/components/customer/CustomerListItem";
import { CustomerListItemStory } from "@/components/customer/CustomerListItem/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withCustomerSearchModal } from "@/components/customer/CustomerSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/components/company/CreateCompanyProvider/__stories__";
import { withCreateCustomerProvider } from "@/components/customer/CreateCustomerProvider/__stories__";
import { withCustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext/__stories__";
import { withDeleteCustomersProvider } from "@/components/customer/DeleteCustomersProvider/__stories__";
import { MockedDeleteCustomerProvider } from "@/components/customer/DeleteCustomerProvider/__stories__";
import { MockedUpdateCustomerProvider } from "@/components/customer/UpdateCustomerProvider/__stories__";

const meta = {
  title: "pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCustomerSearchModal,
    withCustomerFiltersProvider,
    withCreateCustomerProvider,
    withCreateCompanyProvider,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    totalFilteredCustomers: 10,
    selectedSortField: "fullName",
    customersContainer: (
      <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
        {mockedCustomerList.map((customer) => (
          <MockedDeleteCustomerProvider key={customer.id}>
            <MockedUpdateCustomerProvider>
              <CustomerListItem {...CustomerListItemStory.args} {...customer} />
              <CustomerGridItemMobile
                {...CustomerGridItemMobileStory.args}
                {...customer}
              />
              <CustomerGridItemLarge
                {...CustomerGridItemLargeStory.args}
                {...customer}
              />
            </MockedUpdateCustomerProvider>
          </MockedDeleteCustomerProvider>
        ))}
      </EntityContainerPresentation>
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CustomersPageLoading />,
} satisfies Story;

export const WithNoCustomers = {
  args: {
    ...Default.args,
    totalCount: 0,
  },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredCustomers: 0 },
} satisfies Story;
