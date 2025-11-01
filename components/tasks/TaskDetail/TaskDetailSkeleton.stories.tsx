import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailSkeleton } from "./TaskDetailSkeleton";

const meta = {
  title: "components/tasks/TaskDetailSkeleton",
  component: TaskDetailSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof TaskDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
