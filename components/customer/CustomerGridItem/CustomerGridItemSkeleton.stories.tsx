import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItemSkeleton } from "./CustomerGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/CustomerGridItemSkeleton",
  component: CustomerGridItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
