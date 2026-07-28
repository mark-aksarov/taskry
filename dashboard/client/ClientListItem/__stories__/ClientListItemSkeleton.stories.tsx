import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClientListItemSkeleton } from "../ClientListItemSkeleton";

const meta = {
  title: "dashboard/clients/ClientListItemSkeleton",
  component: ClientListItemSkeleton,
} satisfies Meta<typeof ClientListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
