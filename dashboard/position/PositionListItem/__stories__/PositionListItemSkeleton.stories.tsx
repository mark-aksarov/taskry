import { PositionListItemSkeleton } from "../PositionListItemSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "dashboard/positions/PositionListItemSkeleton",
  component: PositionListItemSkeleton,
} satisfies Meta<typeof PositionListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
