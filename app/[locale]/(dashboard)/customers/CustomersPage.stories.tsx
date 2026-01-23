import { fn, mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { CustomersPage } from "./CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { NewCompanyForm } from "@/components/customer/NewCompanyForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFormBase } from "@/components/customer/CustomerFormBase";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { Default as CustomerGridStory } from "@/components/customer/CustomerGrid/CustomerGrid.stories";
import { Default as CustomerListStory } from "@/components/customer/CustomerList/CustomerList.stories";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";
import { Default as CustomerFormBaseStory } from "@/components/customer/CustomerFormBase/CustomerFormBase.stories";
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

export const Default = {
  args: {
    customerToolbarCreateNewMenuTrigger: (
      <CustomerToolbarCreateNewMenuTrigger
        newCustomerFormContainer={
          <CustomerFormBase {...CustomerFormBaseStory.args} />
        }
        newCompanyForm={<NewCompanyForm formAction={fn()} />}
      />
    ),
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
      newCustomerFormContainer={
        <CustomerFormBase {...CustomerFormBaseStory.args} />
      }
    />
  ),
} satisfies Story;
