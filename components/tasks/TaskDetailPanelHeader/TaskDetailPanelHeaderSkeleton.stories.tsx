import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailPanelHeaderSkeleton } from "./TaskDetailPanelHeaderSkeleton";

const meta = {
  title: "components/tasks/TaskDetailPanelHeaderSkeleton",
  component: TaskDetailPanelHeaderSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof TaskDetailPanelHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
