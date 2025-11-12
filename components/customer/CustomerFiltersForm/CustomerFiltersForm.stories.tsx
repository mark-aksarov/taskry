import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersForm } from "./CustomerFiltersForm";
import { CompanyCheckboxGroup } from "@/components/companies/CompanyCheckboxGroup";
import { Default as CompanyCheckboxGroupStory } from "@/components/companies/CompanyCheckboxGroup/CompanyCheckboxGroup.stories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof CustomerFiltersForm> = {
  title: "Components/customers/CustomerFiltersForm",
  component: CustomerFiltersForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerFiltersForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    companyCheckboxGroup: (
      <CompanyCheckboxGroup {...CompanyCheckboxGroupStory.args} />
    ),
  },
};
