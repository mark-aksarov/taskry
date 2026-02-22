import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersForm } from "../CustomerFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../../CustomerFiltersFormCompanyCheckboxGroup";
import { CustomerFiltersFormCompanyCheckboxGroupStory } from "../../CustomerFiltersFormCompanyCheckboxGroup/__stories__";

const meta: Meta<typeof CustomerFiltersForm> = {
  title: "components/customers/CustomerFiltersForm",
  component: CustomerFiltersForm,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerFiltersForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyCheckboxGroup: (
      <CustomerFiltersFormCompanyCheckboxGroup
        {...CustomerFiltersFormCompanyCheckboxGroupStory.args}
      />
    ),
  },
} satisfies Story;
