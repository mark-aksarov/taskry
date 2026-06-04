import { mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CustomersPage } from "./CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCustomerSearchModal } from "@/dashboard/customer/CustomerSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/dashboard/company/CreateCompanyProvider/__stories__";
import { withCreateCustomerProvider } from "@/dashboard/customer/CreateCustomerProvider/__stories__";
import { withCustomerFiltersProvider } from "@/dashboard/customer/CustomerFiltersContext/__stories__";
import { withDeleteCustomersProvider } from "@/dashboard/customer/DeleteCustomersProvider/__stories__";
import { CustomersContainerPresentationExample } from "@/dashboard/customer/CustomersContainer/__stories__";

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
    companyCount: 5,
    totalFilteredCustomers: 10,
    selectedSortField: "fullName",
    customersContainer: <CustomersContainerPresentationExample />,
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
