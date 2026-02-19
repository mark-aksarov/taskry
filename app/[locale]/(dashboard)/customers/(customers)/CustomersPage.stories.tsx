import { fn, mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { CustomersPage } from "./CustomersPage";
import CustomersTemplate from "./CustomersTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { SearchModal } from "@/components/search/SearchModal";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchModalStory } from "@/components/search/SearchModal/__stories__";
import { CustomerGridStory } from "@/components/customer/CustomerGrid/__stories__";
import { CustomerListStory } from "@/components/customer/CustomerList/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteCustomerModalProvider } from "@/components/customer/DeleteCustomerModal/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";
import { CustomerToolbarActionsMenuTriggerStory } from "@/components/customer/CustomerToolbarActionsMenuTrigger/__stories__";
import { CustomerToolbarFiltersModalTriggerStory } from "@/components/customer/CustomerToolbarFiltersModalTrigger/__stories__";
import { CustomerToolbarCreateNewMenuTriggerStory } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger/__stories__";

const meta = {
  title: "pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <CustomersTemplate
        searchModal={<SearchModal {...SearchModalStory.args} />}
      >
        <Story />
      </CustomersTemplate>
    ),
    withDeleteCustomerModalProvider,
    withEntityPaginationProvider,
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

const customerToolbarCreateNewMenuTrigger = (
  <CustomerToolbarCreateNewMenuTrigger
    {...CustomerToolbarCreateNewMenuTriggerStory.args}
  />
);

export const Default = {
  args: {
    customerToolbarCreateNewMenuTrigger: customerToolbarCreateNewMenuTrigger,
    customerToolbarActionsMenuTrigger: (
      <CustomerToolbarActionsMenuTrigger
        {...CustomerToolbarActionsMenuTriggerStory.args}
      />
    ),
    customerToolbarFiltersModalTrigger: (
      <CustomerToolbarFiltersModalTrigger
        {...CustomerToolbarFiltersModalTriggerStory.args}
      />
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
      customerToolbarCreateNewMenuTrigger={customerToolbarCreateNewMenuTrigger}
    />
  ),
} satisfies Story;
