import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersForm } from "./CustomerFiltersForm";
import { CompanyCheckboxGroup } from "@/components/companies/CompanyCheckboxGroup";
import { Default as CompanyCheckboxGroupStory } from "@/components/companies/CompanyCheckboxGroup/CompanyCheckboxGroup.stories";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta: Meta<typeof CustomerFiltersForm> = {
  title: "Components/customers/CustomerFiltersForm",
  component: CustomerFiltersForm,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
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
