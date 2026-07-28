import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCardSkeleton } from "./TotalTasksCardSkeleton";

const meta = {
  title: "dashboard/tasks/TotalTasksCardSkeleton",
  component: TotalTasksCardSkeleton,
} satisfies Meta<typeof TotalTasksCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
