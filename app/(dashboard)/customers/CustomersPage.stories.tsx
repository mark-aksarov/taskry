import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomersPage } from "./CustomersPage";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { Default as CustomerGridStory } from "@/components/customer/CustomerGrid/CustomerGrid.stories";
import { Default as CustomerListStory } from "@/components/customer/CustomerList/CustomerList.stories";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { Default as CustomerFiltersFormStory } from "@/components/customer/CustomerFiltersForm/CustomerFiltersForm.stories";
import CustomersPageLoading from "./loading";

const meta = {
  title: "components/pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    CustomerFiltersFormContainer: () => (
      <CustomerFiltersForm {...CustomerFiltersFormStory.args} />
    ),
    CustomersServerContainer: () => (
      <ViewModeLayout
        list={<CustomerList {...CustomerListStory.args} />}
        grid={<CustomerGrid {...CustomerGridStory.args} />}
      />
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
