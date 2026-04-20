import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerGridItemMobileSkeleton } from "../CustomerGridItemSkeleton";

const meta = {
  title: "dashboard/customers/CustomerGridItemMobileSkeleton",
  component: CustomerGridItemMobileSkeleton,
  decorators: [withThemedBackground],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof CustomerGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
