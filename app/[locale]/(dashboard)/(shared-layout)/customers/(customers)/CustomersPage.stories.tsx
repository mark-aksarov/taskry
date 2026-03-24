import { mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CustomersPage } from "./CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedCompanySummaries } from "@/mocks/companies";
import { SearchList } from "@/components/search/SearchList";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGridLarge } from "@/components/customer/CustomerGrid";
import { CustomerGridMobile } from "@/components/customer/CustomerGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { CreateCustomerForm } from "@/components/customer/CreateCustomerForm";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { CustomerListStory } from "@/components/customer/CustomerList/__stories__";
import { CustomerGridLargeStory } from "@/components/customer/CustomerGrid/__stories__";
import { CustomerGridMobileStory } from "@/components/customer/CustomerGrid/__stories__";
import { CustomerCompanyFiltersForm } from "@/components/customer/CustomerCompanyFiltersForm";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreateCompanyProvider } from "@/components/company/CreateCompanyProvider/__stories__";
import { withCreateCompanyModalProvider } from "@/components/company/CreateCompanyModal/__stories__";
import { withCreateCustomerProvider } from "@/components/customer/CreateCustomerProvider/__stories__";
import { withDeleteCustomersProvider } from "@/components/customer/DeleteCustomersProvider/__stories__";
import { withCustomerFiltersProvider } from "@/components/customer/CustomerFiltersContext/__stories__";
import { withCreateCustomerModalProvider } from "@/components/customer/CreateCustomerModal/__stories__";

const meta = {
  title: "pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    // preserve provider order as in page.tsx file
    withCustomerFiltersProvider,
    withCreateCustomerProvider,
    withCreateCustomerModalProvider,
    withCreateCompanyProvider,
    withCreateCompanyModalProvider,
    withDeleteCustomersProvider,
    withSelectedItemsProvider,

    PageDecorator, // most providers and layout are defined in PageDecorator
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
    searchContainer: <SearchList {...SearchListStory.args} />,
    createCustomerFormContainer: (
      <CreateCustomerForm companySelectItems={mockedCompanySummaries} />
    ),
    filtersFormContainer: (
      <CustomerFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
    customerCompanyFiltersFormContainer: (
      <CustomerCompanyFiltersForm
        companyCheckboxGroupItems={mockedCompanySummaries}
      />
    ),
    customersContainer: (
      <EntityContainerPresentation
        page={1}
        pageSize={3}
        listLarge={<CustomerList {...CustomerListStory.args} />}
        gridLarge={<CustomerGridLarge {...CustomerGridLargeStory.args} />}
        gridMobile={<CustomerGridMobile {...CustomerGridMobileStory.args} />}
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

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredCustomers: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
