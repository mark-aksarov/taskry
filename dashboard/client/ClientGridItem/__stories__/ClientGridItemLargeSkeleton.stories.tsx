import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientGridItemLargeSkeleton } from "../ClientGridItemSkeleton";

const meta = {
  title: "dashboard/clients/ClientGridItemLargeSkeleton",
  component: ClientGridItemLargeSkeleton,
} satisfies Meta<typeof ClientGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
