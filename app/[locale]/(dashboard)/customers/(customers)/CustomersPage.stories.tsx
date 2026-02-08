import { fn, mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { CustomersPage } from "./CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { NewCompanyForm } from "@/components/company/NewCompanyForm";
import { NewCustomerForm } from "@/components/customer/NewCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { Default as CustomerGridStory } from "@/components/customer/CustomerGrid/CustomerGrid.stories";
import { Default as CustomerListStory } from "@/components/customer/CustomerList/CustomerList.stories";
import { Default as NewCompanyFormStory } from "@/components/company/NewCompanyForm/NewCompanyForm.stories";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";
import { Default as NewCustomerFormStory } from "@/components/customer/NewCustomerForm/NewCustomerForm.stories";
import { Default as CustomerFiltersFormStory } from "@/components/customer/CustomerFiltersForm/CustomerFiltersForm.stories";

const meta = {
  title: "components/pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const customerToolbarCreateNewMenuTrigger = (
  <CustomerToolbarCreateNewMenuTrigger
    guestMode={false}
    newCustomerFormContainer={
      <NewCustomerForm {...NewCustomerFormStory.args} />
    }
    newCompanyForm={<NewCompanyForm {...NewCompanyFormStory.args} />}
  />
);

export const Default = {
  args: {
    customerToolbarCreateNewMenuTrigger: customerToolbarCreateNewMenuTrigger,
    customerToolbarActionsMenuTrigger: (
      <CustomerToolbarActionsMenuTrigger deleteAction={fn()} />
    ),
    customerToolbarFiltersModalTrigger: (
      <CustomerToolbarFiltersModalTrigger
        filtersFormContainer={
          <CustomerFiltersForm {...CustomerFiltersFormStory.args} />
        }
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
