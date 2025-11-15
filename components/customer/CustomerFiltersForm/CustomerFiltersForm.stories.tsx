import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersForm } from "./CustomerFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersFormCompanyCheckboxGroup } from "./CustomerFiltersFormCompanyCheckboxGroup";

const meta: Meta<typeof CustomerFiltersForm> = {
  title: "Components/customers/CustomerFiltersForm",
  component: CustomerFiltersForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
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

export const Default = {
  args: {
    companyCheckboxGroup: (
      <CustomerFiltersFormCompanyCheckboxGroup
        companies={[
          {
            id: 1,
            name: "Elevare",
          },
          {
            id: 2,
            name: "Verdeo",
          },
          {
            id: 3,
            name: "CodeLoom",
          },
          {
            id: 4,
            name: "TerraNova",
          },
        ]}
      />
    ),
  },
} satisfies Story;
