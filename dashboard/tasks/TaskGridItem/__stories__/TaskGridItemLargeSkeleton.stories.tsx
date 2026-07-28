import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemLargeSkeleton } from "../TaskGridItemSkeleton";

const meta = {
  title: "dashboard/tasks/TaskGridItemLargeSkeleton",
  component: TaskGridItemLargeSkeleton,
} satisfies Meta<typeof TaskGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
