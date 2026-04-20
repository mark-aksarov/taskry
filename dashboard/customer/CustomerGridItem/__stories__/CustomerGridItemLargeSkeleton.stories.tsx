import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerGridItemLargeSkeleton } from "../CustomerGridItemSkeleton";

const meta = {
  title: "dashboard/customers/CustomerGridItemLargeSkeleton",
  component: CustomerGridItemLargeSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
