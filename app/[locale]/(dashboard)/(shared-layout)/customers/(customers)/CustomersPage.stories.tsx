import { fn, mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { CustomersPage } from "./CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { NewCustomerForm } from "@/components/customer/NewCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { CustomerGridStory } from "@/components/customer/CustomerGrid/__stories__";
import { CustomerListStory } from "@/components/customer/CustomerList/__stories__";
import { newCustomerFormArgs } from "@/components/customer/NewCustomerForm/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/components/company/CreateCompanyContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateCustomerProvider } from "@/components/customer/CreateCustomerContext/__stories__";
import { withDeleteCustomersProvider } from "@/components/customer/DeleteCustomersContext/__stories__";
import { withCustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext/__stories__";

const meta = {
  title: "pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withCustomerFiltersProvider,
    withCreateCompanyProvider,
    withCreateCustomerProvider,
    withDeleteCustomersProvider,
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withCurrentUserProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
    mocked(useParams).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    totalFilteredCustomers: 10,
    selectedSortField: "fullName",
    newCustomerFormContainer: <NewCustomerForm {...newCustomerFormArgs} />,
    filtersFormContainer: (
      <CustomerFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
    customersContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        list={<CustomerList {...CustomerListStory.args} />}
        grid={<CustomerGrid {...CustomerGridStory.args} />}
        totalPages={3}
      />
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
