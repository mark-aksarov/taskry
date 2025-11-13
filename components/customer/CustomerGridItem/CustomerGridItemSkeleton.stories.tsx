import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItemSkeleton } from "./CustomerGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/CustomerGridItemSkeleton",
  component: CustomerGridItemSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
