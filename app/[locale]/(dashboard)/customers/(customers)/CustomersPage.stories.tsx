import { fn, mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { CustomersPage } from "./CustomersPage";
import CustomersTemplate from "./CustomersTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { NewCustomerForm } from "@/components/customer/NewCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { CustomerGridStory } from "@/components/customer/CustomerGrid/__stories__";
import { CustomerListStory } from "@/components/customer/CustomerList/__stories__";
import { newCustomerFormArgs } from "@/components/customer/NewCustomerForm/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withDeleteCustomerModalProvider } from "@/components/customer/DeleteCustomerModal/__stories__";

const meta = {
  title: "pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <CustomersTemplate {...AppHeaderStory.args}>
        <Story />
      </CustomersTemplate>
    ),
    withDeleteCustomerModalProvider,
    withPageTransitionProvider,
    withSelectedItemsProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    totalFilteredCustomers: 10,
    selectedSortField: "fullName",
    createCompany: () => ({ status: "success" }),
    deleteCustomers: () => ({ status: "success" }),
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
  args: { ...Default.args },
  render: () => (
    <CustomersPageEmpty
      guestMode={false}
      createCompany={() => ({ status: "success" })}
      newCustomerFormContainer={<NewCustomerForm {...newCustomerFormArgs} />}
    />
  ),
} satisfies Story;
