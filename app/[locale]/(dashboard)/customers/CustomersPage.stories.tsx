import { mocked } from "storybook/test";
import CustomersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { CustomersPage } from "./CustomersPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { NewCustomerForm } from "@/components/customer/NewCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { withCustomerDetail } from "@/components/customer/CustomerDetailClientContainer/decorators";
import { Default as CustomerGridStory } from "@/components/customer/CustomerGrid/CustomerGrid.stories";
import { Default as CustomerListStory } from "@/components/customer/CustomerList/CustomerList.stories";
import { Default as CustomerFormBaseStory } from "@/components/customer/CustomerFormBase/CustomerFormBase.stories";
import { Default as CustomerFiltersFormStory } from "@/components/customer/CustomerFiltersForm/CustomerFiltersForm.stories";

const meta = {
  title: "components/pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [withCustomerDetail, PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 20,
    CustomerFiltersFormContainer: () => (
      <CustomerFiltersForm {...CustomerFiltersFormStory.args} />
    ),
    CustomersServerContainer: () => (
      <ViewModeLayout
        list={<CustomerList {...CustomerListStory.args} />}
        grid={<CustomerGrid {...CustomerGridStory.args} />}
      />
    ),
    NewCustomerFormContainer: () => (
      <NewCustomerForm {...CustomerFormBaseStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <CustomersPageLoading />,
} satisfies Story;

export const WithNoCustomers: Story = {
  args: { ...Default.args },
  render: () => <CustomersPageEmpty />,
} satisfies Story;
