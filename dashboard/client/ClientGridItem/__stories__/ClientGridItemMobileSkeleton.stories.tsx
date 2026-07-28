import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientGridItemMobileSkeleton } from "../ClientGridItemSkeleton";

const meta = {
  title: "dashboard/clients/ClientGridItemMobileSkeleton",
  component: ClientGridItemMobileSkeleton,
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ClientGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
