import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalCustomersCard } from "./TotalCustomersCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/TotalCustomersCard",
  component: TotalCustomersCard,
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  args: {
    totalCustomers: 20,
  },
} satisfies Meta<typeof TotalCustomersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
