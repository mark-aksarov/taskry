import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCompanySelect } from "./CustomerCompanySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/CustomerCompanySelect",
  component: CustomerCompanySelect,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerCompanySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companies: [
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
    ],
  },
} satisfies Story;
