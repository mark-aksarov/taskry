import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerListItemSkeleton } from "./CustomerListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/CustomerListItemSkeleton",
  component: CustomerListItemSkeleton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
