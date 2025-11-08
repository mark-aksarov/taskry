import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomersPage } from "./CustomersPage";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { PageDecorator, withBackgroundVariant } from "@/.storybook/decorators";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { default as ProjectPageLoading } from "./loading";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { CompanyCheckboxGroup } from "@/components/companies/CompanyCheckboxGroup";
import { CustomersPageEmpty } from "./CustomersPageEmpty";
import { Default as CompanyCheckboxGroupStory } from "@/components/companies/CompanyCheckboxGroup/CompanyCheckboxGroup.stories";
import { Default as CustomerGridStory } from "@/components/customer/CustomerGrid/CustomerGrid.stories";
import { Default as CustomerListStory } from "@/components/customer/CustomerList/CustomerList.stories";

const meta = {
  title: "components/pages/CustomersPage",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withBackgroundVariant()],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers");
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    CompanyCheckboxGroupContainer: () => (
      <CompanyCheckboxGroup {...CompanyCheckboxGroupStory.args} />
    ),
    CustomerViewModeContainer: () => (
      <ViewModeContainer
        list={<CustomerList {...CustomerListStory.args} />}
        grid={<CustomerGrid {...CustomerGridStory.args} />}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <ProjectPageLoading />,
} satisfies Story;

export const WithNoCustomers: Story = {
  args: { ...Default.args },
  render: () => <CustomersPageEmpty />,
} satisfies Story;
