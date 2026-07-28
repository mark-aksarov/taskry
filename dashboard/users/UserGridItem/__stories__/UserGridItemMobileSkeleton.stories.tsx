import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItemMobileSkeleton } from "../UserGridItemSkeleton";

const meta = {
  title: "dashboard/users/UserGridItemMobileSkeleton",
  component: UserGridItemMobileSkeleton,
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof UserGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
